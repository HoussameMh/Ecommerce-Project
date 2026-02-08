const Cart = require('../models/Cart')
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getCart = async (req, res) => {
  const { userId } = req.user
  const cart = await Cart.findOne({ user: userId }).populate({
    path: 'items.product',
    select: 'name price coverImage'
  })
  if (!cart) {
    return res.status(StatusCodes.OK).json({ msg: 'your cart is empty', items: [] })
  }
  res.status(StatusCodes.OK).json({ cart })
}

const calculSubTotal = async (cart) => {
  let total = 0
  for (const item of cart.items) {
    const p = await Product.findById(item.product)
    if (p) total += p.price * item.quantity
  }
  cart.subTotalCents = total
  await cart.save()
}

const addToCart = async (req, res) => {
  const { userId } = req.user
  const { productId, quantity } = req.body

  const product = await Product.findById(productId)

  if (!product) {
    throw new NotFoundError(`Non product with this id  : ${productId}`)
  }

  let cart = await Cart.findOne({ user: userId })
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], subTotalCents: 0 })
  }

  const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity
  } else {
    cart.items.push({ product: productId, quantity })
  }

  await calculSubTotal(cart)
  res.status(StatusCodes.OK).json({ cart })
}

const updateCartQuantity = async (req, res) => {
  const { userId } = req.user
  const { productId } = req.params
  const { quantity } = req.body

  const cart = await Cart.findOne({ user: userId })
  if (!cart) throw new NotFoundError('Cart not found ')

  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId)

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity
    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1)
    }
  } else {
    throw new NotFoundError("Product not found in your cart")
  }

  await calculSubTotal(cart)
  res.status(StatusCodes.OK).json({ cart })
}

const removeItemFromCart = async (req, res) => {
  const { userId } = req.user
  const { productId } = req.params

  const cart = await Cart.findOne({ user: userId })
  if (!cart) throw new NotFoundError('Cart not found')

  cart.items = cart.items.filter(item => item.product.toString() !== productId)

  await calculSubTotal(cart)
  res.status(StatusCodes.OK).json({ cart })
}
const clearCart = async (req, res) => {
  const { userId } = req.user
  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { items: [], subTotalCents: 0 },
    { new: true }
  )
  res.status(StatusCodes.OK).json({ msg: 'Cart cleared !', cart })
}


module.exports = {
  getCart,
  addToCart,
  updateCartQuantity,
  removeItemFromCart,
  clearCart
}