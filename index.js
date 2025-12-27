import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userrouter from "./routes/userrouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Use the variable from your .env file
const mongourl = process.env.MONGO_DB_URI;

mongoose.connect(mongourl)
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

// Middleware to check JWT
app.use((req, res, next) => {
    const authHeader = req.header("Authorization");
    
    if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        // Use process.env.SECRET_KEY to match your .env file
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (!err) {
                req.user = decoded;
            }
        });
    }
    next();
});

app.use("/api/user", userrouter);

app.get("/", (req, res) => {
    res.json({
        message: "Good morning " + (req.body.name || "Guest")
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});