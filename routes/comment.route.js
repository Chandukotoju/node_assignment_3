import express from "express";
import { addComment, deleteComment, getComments } from "../controller/comment.controller.js";
import Auth from "../middleware/auth.js";
import AuthComment from "../middleware/authComment.js";

const router=express.Router() ; 

router.post("/addComment",Auth, addComment) 
router.get("/getComments/:id",Auth, getComments)
router.delete("/deleteComment/:id",Auth, deleteComment)

export default router
