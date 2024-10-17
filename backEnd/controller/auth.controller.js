import  { User } from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import {generateTokenCookie} from '../utils/generateTokenCookie.js'

export const signup = async (req,res) => {
    try {
        const {username, email, password} = req.body
        if(!username || !password || !email){
            return res.status(400).json({message: "Please fill in all fields."})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email address."})
        }
        if(password.length <6){
            return res.status(400).json({success:false, message:"password should be more than 6"})
        }
        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(400).json({message: "Email already exists."})
        }
        const existingUsername = await User.findOne({username})
        if(existingUsername){
            return res.status(400).json({success:false, message:"Username already exists"})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const profile_pic = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = profile_pic[Math.floor(Math.random() * profile_pic.length)]

        const newUser = new User({
            username,
            email,
            password :hashPassword,
            image
        })

        generateTokenCookie(newUser, res)

        await newUser.save()
        res.status(201).json({success:true, 
            user : {
                ...newUser._doc
            }
        })
    } catch (error) {
        console.log(`Error in signup controller`);
        res.status(400).json({success:false, message:"Internal server error"})
    }
}
export const login = async (req,res) => {
try {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({success:false, message:"All fields required"})
    }
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(400).json({success:false, message:"Invalid credentials"})
    }
    const isPassword = await bcryptjs.compare(password, user.password)
    if(!isPassword){
        return res.status(400).json({success:false, message:"Invalid credentials"})
    }
    generateTokenCookie(user._id, res)
    res.status(201).json({success:true, 
        user : {
            ...user._doc,
            password :""
        }
    })
} catch (error) {
    
}
}
export const logout = async (req,res) => {
  try {
    res.clearCookie('jwt-netflix')
    res.status(200).json({success:true, message:"Logged out successfully"})
  } catch (error) {
    console.log(`Error in logout controller`);
        res.status(400).json({success:false, message:"Internal server error"})
  }
}

export const authCheck = async (req,res) =>{
    try {
        console.log(`req.user : ${req.user}`);
        
        res.status(200).json({success:true, user:req.user})
    } catch (error) {
        console.log(`Error in authCheck controller ${error.message}`);
        res.status(400).json({success:false, message:"Internal server error"})
    }
}