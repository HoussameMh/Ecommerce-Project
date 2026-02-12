const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  comment: {
    type: String,
    minlength: 5
  }
})

ReviewSchema.index({ user: 1, product: 1 }, { unique: true })



ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        numReviews: { $count: {} },
      },
    },
  ])

  try {
    await mongoose.model('Product').findOneAndUpdate(
      { _id: productId },
      {
        'rating.averageRating': Math.ceil(result[0]?.averageRating || 0),
        'rating.numReviews': result[0]?.numReviews || 0,
      }
    )
  } catch (error) {
    console.log(error)
  }
}


ReviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.product)
})

ReviewSchema.post('deleteOne', { document: true, query: false }, async function () {
  await this.constructor.calculateAverageRating(this.product)
})

module.exports = mongoose.model('Review', ReviewSchema)