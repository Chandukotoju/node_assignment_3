import { Comment } from "../models.js";
import { Post ,User} from "../models.js";

export const addComment=async(req,res)=>{
    try{
        const {postId,content}=req.body; 
        const userId=req.user.id;
        console.log(userId)
        const newComment=new Comment({
            content,postId,userId
        }) 
        await newComment.save() 
        res.status(200).json({message:"comment posted successfully",newComment})
    }catch(error){
        console.log(error) 
        res.status(500)
    }
} 

export const getComments=async(req,res)=>{
    try{
       const postId=req.params.id; 
       const existingPost=await Post.findById(postId)
       if (!existingPost){
          return res.status(400).json({message:"no post exists"})
       } 
       const postComments=await Comment.find({postId:postId}).populate("userId")
       res.status(200).json({postComments})
    }catch(error){
       console.log(error)
    }
}


export const deleteComment= async(req,res)=>{
    try{
        const commentId=req.params.id 
        
        await Comment.deleteOne({id:commentId}) 
        res.status(200).json("comment deleted successfully")
    }catch(error){
        console.log(error) 
        res.status(500)
    }
}
