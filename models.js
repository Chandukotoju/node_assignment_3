import mongoose from "mongoose"; 

const userSchema= new mongoose.Schema({
     id: { type: Number, required: true, unique: true },
     name:{type:String},
     username:{type:String,required:true},
     email:{type:String,required:true}
}) 
export const User=mongoose.model("user",userSchema)

const postSchema=new mongoose.Schema({ 
     id: { type: Number, required: true, unique: true },
     userId:{type:Number},
     title:{type:String,required:true},
     body:{type:String,required:true}
}) 

export const Post=mongoose.model("post",postSchema)

const commmentSchema= new mongoose.Schema({ 
    id: { type: Number, required: true, unique: true },
    postId:{type:Number},
    name:{type:String,required:true},
    email:{type:String,required:true}, 
    body:{type:String}
})

export const Comment=mongoose.model("Comment",commmentSchema)
