import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import bcrypt from 'bcrypt'

const registerUser = asyncHandler( async (req, res) => {
   const {email, fullName, password, gender} = req.body

   //checking if any field is empty
 
   if(!email || !fullName || !password || !gender){
    throw new ApiError(402, "fill all fields")
   }
  
   //checking if user already exist
   const existedUser = await User.findOne({email})

    if (existedUser) {
        throw new ApiError(409, "User already exists")
    }

   //creating user in database
   const user = await User.create({
    fullName,
    email, 
    password,
    gender
})
 
   //sending userData into frontend without password

    const createdUser = await User.findById(user._id).select(
        "-password"
    )
   

   return res.status(200).json( new ApiResponse(200, createdUser, "User Successfully Registered"))

})

const loginUser = asyncHandler(async (req,res) =>{
    const {email, password} = req.body

    //checking if user entered both fileds

    if(!email || !password ){
        throw new ApiError(402, "All filed required")
       }

       //cheking if user exist in database

       const user = await User.findOne({email})

       if(!user) {
        throw new ApiError(402, "User does not exist")
       }

       //cheking if password matched

       const isPasswordMatched = await bcrypt.compare(password, user.password)

       if(!isPasswordMatched){
        throw new ApiError(404, "User Credentials are wrong")
       }

       //sending user data wihtout password

       const userData = await User.findById(user._id).select("-password")



       return res.status(200).json(new ApiResponse(200, userData,"User logged in successfully" ))

})

export {registerUser,
loginUser}