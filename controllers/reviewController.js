const Review = require('../models/Review')
const Product = require('../models/Product')
const Order = require('../models/Order')

const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const addReview = async (req, res) => {
  const { userId } = req.user
  const { productId, rating, comment } = req.body

  const product = await Product.findById(productId)
  if (!product) throw new NotFoundError(`no product with this id  ${productId}`)

  const hasPurchased = await Order.findOne({
    user: userId,
    'orderItems.product': productId,
  })

  if (!hasPurchased) {
    throw new BadRequestError("You must buy the product firs")
  }

  if (!rating) throw new BadRequestError('you must give a rating between 1 and 5')


  const review = await Review.create({
    user: userId,
    product: productId,
    rating,
    comment
  })

  res.status(StatusCodes.CREATED).json({ review })

}

const getProductReviews = async (req, res) => {
  const { productId } = req.params

  const reviews = await Review.find({ product: productId }).populate({
    path: 'user',
    select: 'lastName firstName',
  })

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length })

}

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params
  const { userId, isAdmin } = req.user

  const review = await Review.findById(reviewId)

  if (!review) {
    throw new NotFoundError(`no review with this id : ${reviewId}`)
  }

  if (review.user.toString() !== userId && !isAdmin) {
    throw new BadRequestError("you're not permitted to delete this review")
  }

  await review.deleteOne()

  res.status(StatusCodes.OK).json({ msg: "review deleted" })
}

module.exports = {
  addReview,
  getProductReviews,
  deleteReview
}