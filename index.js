import express from "express";
import BodyParser from "body-parser";
import mongoose from "mongoose";
import Student from "./models/student.js";
import studentrouter from "./routes/studentrouter.js";  
import productrouter from "./routes/productrouter.js";
import userrouter from "./routes/userrouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const app = express();



mongoose.connect(mongourl,{})

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
})

app.use(express.json());

app.use(
    (req,res,next)=>{
     const token= console.log(req.header("Authorization"))?.replace("Bearer ","");
     console.log(token);

     if(token!=null){
         jwt.verify(token,"cbc-secret key-7973", (err,decoded)=>{
             if(!err){
               console.log(decoded);
               req.user=decoded;
             }
             
         })
     }
      next();
    }
)
app.use("/api/student", studentrouter);
app.use("/api/product", productrouter);
app.use("/api/user", userrouter);
app.get("/",
    (req,res)=>{
    console.log()
    console.log("req");
    console.log("Hello World!");
    res.json(

        {
            message:"Good morning "+req.body.name
        }
    )
});

/*app.post("/",
    (req,res)=>{
    console.log(req,body);
    console.log("This is a post request");
    res.json(
        {
            message:"This is a post request"
        }
    )

});*/
/*app.listen(5000, () => {
    console.log("Server is running on port 5000");
});*/

app.post("/", 
    (req, res) => {
        
        const newStudent = new Student(req.body);

        newStudent.save().then(
            () => {
                res.json({
                    message: "student created"
                    
            
        
    
});
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});