import bcrypt from "bcryptjs";
import { User } from "../Models/user.model.js";
import { generateToken } from "../Middleware/authmiddleware.js";


export const Register = async(req,res)=>{
 const{name,email,password} = req.body;

 try{
    if(!name || !email || !password){
        return res.status(400).json({message:"please fill all the fields"})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        name,
        email,
        password:hashedPassword ,   })

        res.status(201).json({message:"user registered successfully",user})
 }
catch(error){
    res.status(500).json({message:"something went wrong"})
    console.log(error);
}
}
//login Function

export const Login = async(req,res)=>{
    const{email,password}= req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message:"please fill all the fields"})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        const ispPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!ispPasswordCorrect){
            return res.status(400).json({message:"invalid credentials"})
        }
       const token =  generateToken(user._id);
        res.status(200).json({message:"login Succesfully",user,token})

    }catch(error){
        console.log(error)
     res.status(500).json({message:"something went wrong"})
        
    }
}
 
