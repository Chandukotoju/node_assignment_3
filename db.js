import mongoose from "mongoose";  

const MONGO_URI="mongodb+srv://chandukotoju7:chandu200322@cluster0.yyz2r.mongodb.net/social_app?retryWrites=true&w=majority&appName=Cluster0"

const connectDb=async()=>{
     try{
      await mongoose.connect(MONGO_URI); 
      console.log("mongo db connected")
     }catch(error){
        console.log(error)
     }
} 

export default connectDb;