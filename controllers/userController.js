const User=require('../models/User')
const {StatusCodes}=require('http-status-codes')


const getUsers = async (req,res) =>{
  const users = await User.find({ }).select('-password');

  res.status(StatusCodes.OK).json({ users, count: users.length });
}

module.exports = { getUsers};