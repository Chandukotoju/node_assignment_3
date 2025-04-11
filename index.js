import express from "express"; 
import connectDb from "./db.js"; 
import cors from "cors"; 
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import { Comment, Post, User } from "./models.js";

const app=express(); 
app.use(cors())

connectDb();

app.use(express.json())  

await User.deleteMany({});
await Post.deleteMany({});
await Comment.deleteMany({});


app.use("/users",userRouter) 
app.use("/post",postRouter) 
app.use("/comment",commentRouter)

app.listen(4000,()=>console.log("server listening on port 4000"))