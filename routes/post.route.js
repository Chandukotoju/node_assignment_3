import express from "express"; 
import { addPost, deletePost, getAllPosts, userPosts } from "../controller/post.controller.js";
import Auth from "../middleware/auth.js";
import AuthRole from "../middleware/authRole.js";

const router=express.Router(); 

router.post("/addPost",Auth,addPost)
router.get("/getAllPosts",getAllPosts)
router.get("/userPosts/:id",userPosts)
router.delete("/deletePost/:id",Auth,AuthRole ,deletePost)

export default router