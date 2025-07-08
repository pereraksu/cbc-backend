import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    isBlocked : {
        type: Boolean,
        default: false
    },
    type : {
        type: String,
        default: "customer"
    },
    profilePicture : {
        type: String,
        default: "https://www.freepik.com/free-psd/contact-icon-illustration-isolated_397057724.htm#fromView=keyword&page=1&position=3&uuid=6b868f24-33ca-4263-99bb-81899ab5ef6f&query=User+Profile"
    }
})

const User = mongoose.model("user", userSchema);
export default User;
