import express from "express"; 
import connectDb from "./db.js"; 
import router from "./routes.js";

const app=express(); 

connectDb();

app.use(express.json()) 

app.use("/",router)

app.listen(4000,()=>console.log("server listening on port 3000"))