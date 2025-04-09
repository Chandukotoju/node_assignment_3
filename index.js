import express from "express"; 
import connectDb from "./db.js"; 
import router from "./routes.js"; 
import cors from "cors";

const app=express(); 
app.use(cors())

connectDb();

app.use(express.json()) 


app.use("/",router) 
app.use("/post",router) 
app.use("/comment",router)

app.listen(4000,()=>console.log("server listening on port 4000"))