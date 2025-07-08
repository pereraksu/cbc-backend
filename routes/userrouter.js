import express from "express";
import { createUser, loginUser } from "../controllers/usercontroller.js";

const userrouter = express.Router();

userrouter.post("/", createUser);
userrouter.post("/login", loginUser);

export default userrouter;