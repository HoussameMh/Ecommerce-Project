const express = require('express')
const router = express.Router()

const { authenticateUser } = require('../middleware/authentication')

const {
  getCart,
  addToCart,
  updateCartQuantity,
  removeItemFromCart,
  clearCart
} = require('../controllers/cartController')

router.use(authenticateUser)

router.route('/').get(getCart).delete(clearCart)
router.post('/items', addToCart)
router.route('/items/:productId').patch(updateCartQuantity).delete(removeItemFromCart)

module.exports = router