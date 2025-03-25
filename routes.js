import express from "express"; 
import axios from "axios"; 
import { Comment, Post, User } from "./models.js";

const router=express.Router() 

router.get("/load",async(req,res)=>{
    
    try{
        const {data}= await axios.get("https://jsonplaceholder.typicode.com/users") 
        for (let user of data){
            const newUser=new User(user); 
            await newUser.save(); 
            const {data}=await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`) 
            for (let post of data){
                const newPost=new Post(post)
                await newPost.save() 
                const {data}=await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
                for (let comment of data){
                    const newComment=new Comment(comment);
                    await newComment.save() 
                }
            }
        }
        res.json("done").send();
    }catch(error){
        console.log(error)
        res.status(500).json("hey error here")
    }
}) 

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
    const userDetails = await User.findOne({id:userId}).lean()
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


export default router