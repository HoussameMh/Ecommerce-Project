const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')


const getUsers = async (req, res) => {
  const users = await User.find({}).select('-password');

  res.status(StatusCodes.OK).json({ users, count: users.length });
}


const showMe = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findById(userId).select('-password');

  if (!user) {
    throw new NotFoundError(`No user found with id: ${userId}`);
  }

  res.status(StatusCodes.OK).json({ user });
}

module.exports = { getUsers, showMe };