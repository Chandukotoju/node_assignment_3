import jwt from "jsonwebtoken";

const Auth=async(req,res,next)=>{
    try{
        
        const token=req.headers.authorization.split(" ")[1] 
        const decoded= jwt.verify(token,"myVerySecretKey123!@#")  
        req.user=decoded 
        next()
    }catch(error){
        console.log(error)
    }
}   

export default Auth