import { Post ,User } from "../models.js";

export const addPost=(async(req,res)=>{
    try{
        const {imageUrl,caption}=req.body; 
        const userId=req.user.id
        const newPost = new Post({
        imageUrl,caption ,userId
       }) 
       await newPost.save() 
       res.status(200).json({message:"posted successfully",newPost})
    }catch(error){
        console.log(error) 
        res.status(500)
    }
}) 

export const getAllPosts=(async(req,res)=>{
    try{
        const allPosts= await Post.find({}).populate("userId");
        res.status(200).json({message:"all posts fetched successfully",allPosts})
    }catch(error){
        console.log(error) 
        res.status(500)
    }
}) 

export const userPosts=(async(req,res)=>{
    try{
        const userId=req.params.id;
        const userPosts=await Post.find({userId:userId}).populate("userId") 
        res.status(200).json({message:"user posts fetched successfully",userPosts})
    }catch(error){
        console.log(error) 
        res.status(400)  
    }
})

export const deletePost=async(req,res)=>{
    try{
        const postId=req.params.id 
        await Post.deleteOne({id:postId}) 
        res.status(200).json({message:"post deleted successfully"})
    }catch(error){
       console.log(error) 
       res.status(500)
    } 
}