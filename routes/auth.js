//token creation

const express = require ("express")
// const bcrypt = require ("bcrypt")
const jwt = require ("jsonwebtoken")
const User = require ("../model/user.js")
const router = express.Router()


//user registration

router.post('/register',async(req,res)=>{
    try {
        const{username,password} = req.body
        // const hashedPassword = await bcrypt . hash(password,10)   //10 is a parameter to define the hashing difficulty (hashing function)
        const user = new User({
            username:username,
            password:password,
        })
        await user.save()
        res.status(200).json({message:"User Registered Successfully"})  //to sent a response back
    } catch (error) {
        // res.status(500).json({error:"registration failed"})
        console.log(error);
    }
})


//user login

router.post('/login',async (req,res)=>{
    try {
        const {username,password}=req.body
        const user = await User.findOne({username})
        if(!user){
            return res.status(401).json({error:"Authentication failed"})
        }
        const passwordMatch =await(password,user.password) // await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.status(401).json({error:"Password not match"})
        }

//token generation

        const token =jwt.sign({userId:user._id},"secret_key",{expiresIn:'1h'})  

        res.status(200).json({token})   //response if username and password is correct

    } catch (error) {
        res.status(500).json({error:"login failed"})
        
    }
})
module.exports = router;