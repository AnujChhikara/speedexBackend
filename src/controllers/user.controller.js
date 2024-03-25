import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"

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
        "-password -refreshToken"
    )
   

   return res.status(200).json( new ApiResponse(200, createdUser, "User Successfully Registered"))

})

export {registerUser}