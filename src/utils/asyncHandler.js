
//we can create it by promis as well as try catch
// cosnt asyncHandler=()=>{}
// cosnt asyncHandler=(func)=>()=>{}
// cosnt asyncHandler=(func)=>async()=>{}

//     //by try catch
// const asyncHandler= (func)=async(error, req, res, next)=>{
// try{
//     const connectinsta= await func(error, req, res, next)

// }catch(error){
// res.status(err.code || 500).json({
//     success:false,
//     message: err.message
// })
// }
// }

///by promis 
const asyncHandler =(requestHandler)=>{
   return (req, res, next)=>{
        Promise.resolve(requestHandler(req, res, next))
        .catch((err)=> next(err))
    }
}



export {asyncHandler};

 
