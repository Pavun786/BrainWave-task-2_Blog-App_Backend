const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRegister = async(req,res)=>{

   try{

    const {userName,email,password} = req.body;

    const verifyUser = await userModel.findOne({email : email})

    if(verifyUser){
        res.status(403).send({message : "user registered already"})
    }else{
        const No_Of_Rounds = 10;
        const salt = await bcrypt.genSalt(No_Of_Rounds)
        const hashedPassword = await bcrypt.hash(password,salt)

        const createUser = new userModel({
            userName : userName,
            email : email,
            password : hashedPassword
        })

        await createUser.save()

        res.status(200).send({message : "user registered successfully"})
    }
      
   }catch(err){
     res.status(500).send({message : err.message})
   }

}

const loginUser = async(req,res)=>{
     
    try{
        const {email,password} = req.body;

    const verifyUser = await userModel.findOne({email : email})

    if(!verifyUser){
        res.status(403).send({message : "user doesn't exist"})

    }else{
        const verifyPassword = await bcrypt.compare(password,verifyUser.password)

        if(!verifyPassword){
            res.send({message : "unAuthorized access"})
        }else{
            const token = await jwt.sign({id : verifyUser._id},process.env.SECRET_KEY)

            res.status(200).send({message : "user logined successfully",verifyUser,token})
        }
    }
    }catch(err){
        res.status(500).send({message : err.message})
    }
}

module.exports = {userRegister,loginUser}