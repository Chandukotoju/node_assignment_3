import { Post } from "../models.js";

const AuthRole=async(req,res,next)=>{
    const userId=req.user.id; 
    const postId=req.params.id 
    const existingPost= await Post.findById(postId) 
    const isOwner=userId==existingPost.userId;
    if(!isOwner){
       return res.status(400)
    } 
    next()
} 

export default AuthRole 