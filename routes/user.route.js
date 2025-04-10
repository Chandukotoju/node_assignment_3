import express from "express"; 
import { editUser, getAllUsers, SignUp, userData } from "../controller/user.controller.js"; 
import { Login } from "../controller/user.controller.js";
import Auth from "../middleware/auth.js";

const router=express.Router();
 
router.post("/signup",SignUp)  
router.post("/login",Login)
router.patch("/editUser/:id",Auth,editUser) 
router.get("/getAllUsers",getAllUsers) 
router.get("/getUserData/:id",userData)

export default router;