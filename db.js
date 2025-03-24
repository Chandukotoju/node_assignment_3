import mongoose from "mongoose";  

const MONGO_URI="mongodb://127.0.0.1:27017/social_app"

const connectDb=async()=>{
     try{
      await mongoose.connect(MONGO_URI); 
      console.log("mongo db connected")
     }catch(error){
        console.log(error)
     }
} 

export default connectDb;