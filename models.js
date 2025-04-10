import mongoose from "mongoose"; 

const userSchema= new mongoose.Schema({
     password:{type:String},  
     username:{type:String,required:true},  
     email:{type:String,required:true},  
     profileUrl:{type:String}, 
     bio:{type:String} 
}) 
export const User=mongoose.model("User",userSchema)

const postSchema=new mongoose.Schema({ 
     profileUrl:{type:String},
     imageUrl:{type:String}, 
     caption:{type:String},
     userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"}, 
     usename:{type:String},
}) 

export const Post=mongoose.model("Post",postSchema)

const commmentSchema= new mongoose.Schema({ 
    postId:{type:mongoose.Schema.Types.ObjectId,ref:"Post"}, 
    content:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
})

export const Comment=mongoose.model("Comment",commmentSchema)
