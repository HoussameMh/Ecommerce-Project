const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Product = require('../models/Product')

const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const createOrder = async (req, res) => {
  const { userId } = req.user
  const { street, city, zipCode, country } = req.body
  const shippingFee = 1500

  const cart = await Cart.findOne({ user: userId })
  if (!cart) throw new NotFoundError('Cart not found ')
  if (cart.items.length == 0) throw new BadRequestError('Your cart is empty')

  const orderItems = []
  for (const item of cart.items) {
    const p = await Product.findById(item.product)
    if (!p) {
      throw new NotFoundError(`no product with this id : ${item.product}`)
    }
    orderItems.push({
      product: p._id,
      name: p.name,
      price: p.price,
      quantity: item.quantity
    })

  }
  const order = await Order.create({
    user: userId,
    orderItems,
    shippingAddress: { street, city, zipCode, country },
    status: 'pending',
    total: cart.subTotalCents + shippingFee
  })


  await Cart.findOneAndDelete({ user: userId })
  res.status(StatusCodes.CREATED).json({ order })


}

const getMyOrders = async (req, res) => {
  const { userId } = req.user
  const orders = await Order.find({ user: userId })
  res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

const getOrderDetail = async (req, res) => {
  console.log('Type de NotFoundError:', typeof NotFoundError);
  const { userId, isAdmin } = req.user
  const { id: orderId } = req.params
  const order = await Order.findById({ _id: orderId })

  if (!order) {
    throw new NotFoundError(`No commande with this id : ${orderId}`)
  }

  if (order.user.toString() !== userId && !isAdmin) {
    throw new BadRequestError("you have not the right to see this commande")
  }

  res.status(StatusCodes.OK).json({ order })
}



const updateStatus = async (req, res) => {
  const { id: orderId } = req.params
  const { status, deliveredAt } = req.body
  const order = await Order.findOneAndUpdate({ _id: orderId }, { status, deliveredAt }, { new: true, runValidators: true })
  if (!order) {
    throw new NotFoundError(`No commande with this id : ${orderId}`)
  }
  res.status(StatusCodes.OK).json({ order })
}


const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
  res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

module.exports = {
  createOrder,
  getMyOrders,
  getOrderDetail,
  updateStatus,
  getAllOrders
}
