const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty & Personal Care', 'Sports & Outdoors', 'Toys & Games', 'Books', 'Automotive', 'Other']
  },
  coverImage: {
    type: String,
    required: true,
  },
  imagesUrl: {
    type: [String],
    required: false,
  },
  videoUrl: {
    type: String,
    required: false
  },
  stock: { type: Number, default: 0 },
  rating: {
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }

})


module.exports = mongoose.model('Product', ProductSchema);