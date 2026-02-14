const User=require('../models/User')
const {StatusCodes}=require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const  register=async (req,res)=>{
  const user = await  User.create({...req.body,isAdmin: false})
  const token =user.createJWT()
  res.status(StatusCodes.CREATED).json({user:{lastName:user.lastName},token})
}

const  login=async (req,res)=>{
  const {email,password}=req.body


 


  
  if(!email || !password){
    throw new BadRequestError('please provide email and pass')
  }
  const user =await User.findOne({email})
  
  if(!user){
    throw new UnauthenticatedError('invalid cridentials')
  }
  const isPasswordCorrect=await user.comparePassword(password)
  if(!isPasswordCorrect){
    throw new UnauthenticatedError('invalid cridentials')
  }
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({user:{
    lastName:user.lastName,
    id:user._id,
    isAdmin: user.isAdmin
  },token})
}

module.exports={
  register,
  login
}