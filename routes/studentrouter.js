import express from "express";


import { getstudents, createstudent} from "../controllers/studentcontroller.js";

//create studentrouter
const studentrouter = express.Router();

studentrouter.get("/", getstudents);

studentrouter.post("/", createstudent);
export default studentrouter;
