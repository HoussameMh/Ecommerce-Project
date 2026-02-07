const express = require('express')
const router = express.Router()

const {authenticateUser} = require('../middleware/authentication')
const {authorizePermissions}= require ('../middleware/full-auth')

const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require ('../controllers/productController')

router.get('/',getAllProducts)
router.get('/:id',getProduct)

router.use([authenticateUser,authorizePermissions])

router.post('/',createProduct)
router.patch('/:id',updateProduct)
router.delete('/:id' , deleteProduct)

module.exports=router