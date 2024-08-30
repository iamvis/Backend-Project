import mongoose, {Schema} from "mongoose";
const userSchema= new Schema(
    {username:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        index:true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        lowecase:true,
        trim:true,
        required:true
        
    },
    fullname:{
        type: String,
        required: true,
        tirm:true,
        index:true
    },
    avatar:{
        type:String, //cloudinary url
        required:true
    },
    coverImage:{
        type:String,
        required: true,
    },
    watchHistory:[
        {type:Schema.Types.ObjectId,
         ref:"yaha video ka ref denge"}
    ],
    password:{
        type:String,
        required:[true, "password is required"],
      
    },
    refreshToken:{
        type:String,
    }


},
    {timestamps:true})

    //USING ----- PRE ----- middlweare
    //it run operation just before saving data in database
    //next is only flag for next5 midleware

    // userSchema.pre("save", async function(next){
    // this.password= bcrypt.hash(this.password, 10)
    // next()
    // })

    userSchema.pre("save", async function(next){

        // to dont save all data multiple times  without being change
        if(!this.isModified("password")) return next();

        this.password= await bcrypt.hash(this.password, 10)
        next()
    })

    //comparing the data is correct
    userSchema.methods.isPasswordCorrect= async function(){
        return await bcrypt.compare(password, this.password)
    }

    //ACCESTOKEN
    userSchema.methods.generateAccessToken= function(){
      return  jwt.sign({
            _id:this.id,
            email:this.email,
            username:this.username,
            fullname:this.fullname,
        },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
    )                       
    }
    //REFRESHTOKEN
    userSchema.methods.generateRefreshToken= function(){
      return  jwt.sign({
            _id:this.id,
          
        },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
    )                       
    }


export const User= mongoose.model("User",userSchema);