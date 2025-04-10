import { Post } from "../models.js";
import { Comment } from "../models.js";

const AuthComment=async(req,res,next)=>{
   
    const userId=req.user.id; 
    const commentId=req.params.id 
    const existingPost= await Comment.findById(commentId) 
    const isOwner=userId==existingPost.userId; 
    const postDetails=await Post.findById(existingPost.postId); 
    const isPostOwner=userId==postDetails.userId;
    if(!isOwner && !isPostOwner){
       return res.status(400)
    } 
    
    next() 
} 

export default AuthComment