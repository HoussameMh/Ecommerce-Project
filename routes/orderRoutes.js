const express = require('express')
const router = express.Router()

const { authenticateUser } = require('../middleware/authentication')
const { authorizePermissions } = require('../middleware/full-auth')

const { createOrder,getMyOrders,getOrderDetail,updateStatus,getAllOrders} = require ('../controllers/orderController')

router.use(authenticateUser)

router.post('/',createOrder)
router.get('/my-orders',getMyOrders)
router.get('/:id',getOrderDetail)

router.use(authorizePermissions)

router.patch('/:id/status',updateStatus)
router.get('/',getAllOrders)


module.exports = router