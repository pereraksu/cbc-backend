import User from "../models/user.js";
import bcrypt from "bcryptjs";  
import jwt from "jsonwebtoken";

export function createUser(req, res) {
    
    const newUserData = req.body;

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

                }, "cbc-secret key-7973")
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