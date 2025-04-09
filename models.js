import mongoose from "mongoose"; 

const userSchema= new mongoose.Schema({
     name:{type:String},
     username:{type:String,required:true},
     email:{type:String,required:true}
}) 
export const User=mongoose.model("user",userSchema)

const postSchema=new mongoose.Schema({ 
     profileUrl:{type:String},
     imageUrl:{type:String}, 
     caption:{type:String},
     userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"}, 
     usename:{type:String},
}) 

export const Post=mongoose.model("post",postSchema)

const commmentSchema= new mongoose.Schema({ 
    postId:{type:mongoose.Schema.Types.ObjectId,ref:"Post"},
    username:{type:String,required:true},
    profileUrl:{type:String,required:true}, 
    content:{type:String}
})

export const Comment=mongoose.model("Comment",commmentSchema)
