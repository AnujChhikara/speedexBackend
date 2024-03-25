import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    gender:{
        type:String,
        enum:["Male","Female", "Other"],
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},  {timestamps:true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})


export const User = mongoose.model("User",userSchema)