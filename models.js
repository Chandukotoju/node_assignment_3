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
     imageUrl:{type:String}, 
     caption:{type:String},
     userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},  
}, { timestamps: true }) 

postSchema.index({ userId: 1 });

export const Post=mongoose.model("Post",postSchema)

const commmentSchema= new mongoose.Schema({ 
    postId:{type:mongoose.Schema.Types.ObjectId,ref:"Post",required:true}, 
    content:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
},{timestamps:true})

export const Comment=mongoose.model("Comment",commmentSchema)
