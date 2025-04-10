import { User } from "../models.js";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";

export const SignUp=("/signup",async(req,res)=>{
    try{
        const {username,email,password}=req.body;  
        const existed = await User.findOne({email:email}) 
        if(existed){
            return res.status(409).json({message:"user already exists"}).send()
        }  
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser= new User({username,email,password:hashedPassword,profileUrl:"https://cdn-icons-png.flaticon.com/512/149/149071.png"})
        await newUser.save()  
        res.status(200).json(["done",newUser]).send()
    }catch(error){ 
        console.log(error) 
        res.status(500).send() 
    }
}) 

export const Login=async(req,res)=>{
    try{
        const {email,password}=req.body; 
        const existingUser=await User.findOne({email:email}) 
        if(!existingUser){
            res.status(404).json("user does not exist , please signup")
        } 
        const passwordTrue=bcrypt.compare(password,existingUser.password) 
        if (passwordTrue){
            const token=jwt.sign({id:existingUser._id,username:existingUser.username,email},"myVerySecretKey123!@#",{expiresIn:"30d"})
            return res.status(200).json(["login successsfully",token])
        } 
        res.status(400).json("password does not match")
    }catch(error){
       console.log(error) 
       res.status(500)
    }
} 

export const editUser=async(req,res)=>{
    try{
        const userId=req.params.id
        const newUserData=req.body 
        const existingData=await User.findById(userId) 
        Object.assign(existingData,newUserData) 
        await existingData.save()
        res.status(200).json({message:"updated successfully",existingData})
    }catch(error){
        console.log(error)
    }   
} 

export const getAllUsers=async(req,res)=>{
    try{
        const usersData=await User.find({}) 
        res.status(200).json(usersData)
    }catch(error){
        console.log(error)
    } 
} 

export const userData=async(req,res)=>{
    try{
        const userId=req.params.id
       const userData=await User.findById(userId) 
       res.status(200).json(userData);
    }catch(error){
       console.log(error) 
       res.status(500)
    }
}