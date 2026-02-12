const express=require('express')
const router = express.Router()

const {authenticateUser} = require ('../middleware/authentication')
const {authorizePermissions} =require('../middleware/full-auth')
const {getUsers}=require('../controllers/userController')

router.get('/',[authenticateUser,authorizePermissions],getUsers)

module.exports = router
