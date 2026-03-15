const express=require('express')
const router = express.Router()

const {authenticateUser} = require ('../middleware/authentication')
const {authorizePermissions} =require('../middleware/full-auth')
const {getUsers,showMe}=require('../controllers/userController')

router.get('/',[authenticateUser,authorizePermissions],getUsers)
router.get('/showMe',[authenticateUser],showMe)

module.exports = router
