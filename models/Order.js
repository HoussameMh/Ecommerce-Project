const mongoose = require('mongoose')



const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    quantity: { type: Number, required: true }
  }],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: Number, required: true },
    country: { type: String, required: true }
  },
  status: {
    enum: ['pending', 'paid', 'shipped', 'delivered', 'canceled'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  estimatedDeliveryDate: { 
    type: Date,
    default: () => new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) 
  },
  deliveredAt: { type: Date }
})


module.exports = mongoose.model('Order', OrderSchema);