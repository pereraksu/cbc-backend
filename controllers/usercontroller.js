import User from "../models/user.js";
import bcrypt from "bcryptjs";  
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function createUser(req, res) {
    
    const newUserData = req.body;

    if(newUserData.type == "admin"){
        if(req.user!== null && req.user.type != "admin"){
           res.json({message : "Please login as admin"})
           return;
        }
    }

    if(newUserData.type == "admin"){
        if(req.user!== null && req.user.type != "admin"){
           res.json({message : "Please login as admin"})
           return;
        }
    }

    newUserData.password = bcrypt.hashSync(newUserData.password, 10);


    console.log(newUserData);

    const user = new User(newUserData);

    user.save()
        .then(() => {
            res.json({ message: "User created" });
        })
        .catch(() => {
            res.status(400).json({ message: "User not created" });
        });
    
}

export function loginUser(req, res) {
    
    User.find({email : req.body.email}).then(
        (users)=>{
           // res.json(users)

           if(users.length == 0){
              res.json({message : "User not found"})
           }
           else{
                
            const user = users[0];
            
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

            if(isPasswordCorrect){
                /*res.json({
                    message: "User logged in"
                });*/

                const token=jwt.sign({
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    isBlocked : user.isBlocked,
                    type : user.type,
                    profilePicture : user.profilePicture

                }, process.env.SECRET_KEY);
                console.log(token);

                res.json({
                    message: "User logged in",
                    token : token
                });
            }

                else{
                    res.json({
                        message: "User not logged in (wrong password)"
                    });
                }
            }  
            
           }
    )
}

export function deleteUser(req, res) {
    User.deleteOne({email : req.params.email}).then(
        ()=>{
            res.json({
                message : "User deleted successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "User not deleted"
            })
        }
    )
}

export function isAdmin(req, res) {
    if(req.user==null){
        return false;
    }

    if(req.user.type!="admin"){
        return false;
    }

    return true;
}

export function isCustomer(req){
    if(req.user==null){
        return false;
    }
    if(req.user.type!="customer"){
        return false;
    }
    return true;
}