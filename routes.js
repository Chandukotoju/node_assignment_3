import express from "express"; 
import axios from "axios"; 
import { Comment, Post, User } from "./models.js";

const router=express.Router() 



router.delete("/users",async(req,res)=>{
    try{
        await User.deleteMany({});
        res.status(204).send()
    }catch(error){
        res.status(500).json("deleted successfully")
    }
})

router.delete("/users/:id",async(req,res)=>{
    try{
        const userId=req.params.id; 
        console.log(userId)
        await User.deleteOne({id:userId}) 
        res.status(200).send()
    }catch(error){
        console.log(error)
        res.status(500).send()
    }
})

router.get("/users/:id",async(req,res)=>{ 
   try{
    const userId=req.params.id 
    const userDetails = await User.findOne({_id:userId}).lean() 
    console.log(userDetails)
    const userPosts=await Post.find({userId:userId})
    const userPostComments=await Promise.all(
      userPosts.map(async(post)=>{
          const postComments=await Comment.find({postId:post.id}) 
          return {...post.toObject(),comments:postComments}
      }) 
    );
    userDetails.posts=userPostComments;
    console.log(userDetails) 
    res.json(userDetails).send()
   }catch(error){
    console.log(error)
   }
}) 

router.post("/users",async(req,res)=>{
    try{
        const {id,name,username,email}=req.body;  
        const existed = await User.findOne({id:id}) 
        if(existed){
            return res.status(409).json({message:"user already exists"}).send()
        } 
        const newUser={id,name,username,email} 
        await User.create(newUser) 
        res.status(200).json("done ").send()
    }catch(error){
        console.log(error) 
        res.status(500).send()
    }
})

router.get("/users",async(req,res)=>{
    try{
        const userData=await User.find({}) ;
        res.status(200).json(userData).send();
    }catch(error){
        console.log(error)
    }
})

router.post("/add", async(req,res)=>{
    const {userId,profileUrl,username,imageUrl,caption}=req.body; 
    try{
       const newPost = new Post({
        username,profileUrl,imageUrl,caption ,userId,postComments:[]
       }) 
       await newPost.save() 
       res.status(200).json({message:"posted successfully",newPost})
    }catch(error){
        console.log(error) 
        res.status(500)
    }
}) 

router.delete("/remove/:id",async(req,res)=>{
    try{
        const postId=req.params.id 
        await Post.deleteOne({id:postId}) 
        res.status(200).json({message:"post deleted successfully"})
    }catch(error){
       console.log(error) 
       res.status(500)
    } 
}) 

router.get("/getAllPosts",async(req,res)=>{
    try{
        const allPosts= await Post.find({}) 
        res.status(200).json({message:"all posts fetched successfully",allPosts})
    }catch(error){
        console.log(error) 
        res.status(500)
    }
}) 

router.get("/userPosts/:id",async(req,res)=>{
    try{
        const userId=req.params.id;
        const userPosts=await Post.find({userId:userId}) 
        res.status(200).json({message:"user posts fetched successfully",userPosts})
    }catch(error){
        console.log(error) 
        res.status(400)
    }
})

router.post("/addComment",async(req,res)=>{
    try{
        const {postId,profileUrl,username,content}=req.body; 
        const newComment=new Comment({
            profileUrl,username,content,postId
        }) 
        await newComment.save() 
        res.status(200).json({message:"comment posted successfully",newComment})
    }catch(error){
        console.log(error) 
        res.status(500)
    }
}) 

router.get("/getComments/:id",async(req,res)=>{
    try{
       const postId=req.params.id; 
       const existingPost=await Post.findById(postId) 
       if (!existingPost){
          return res.status(400).json({message:"no post exists"})
       } 
       const postComments=await Comment.find({postId:postId}) 
       res.status(200).json({postComments})
    }catch(error){
       console.log(error)
    }
})

router.delete("/removeComment/:id",async(req,res)=>{
    try{
        const commentId=req.params.id 
        await Comment.deleteOne({id:commentId}) 
        res.status(200).json("comment deleted successfully")
    }catch(error){
        console.log(error) 
        res.status(500)
    }
})

export default router