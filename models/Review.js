const mongoose=require('mongoose')

const ReviewSchema = new mongoose.Schema({
  user : { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  }, 
  product:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',
    required: true 
  },
  rating : {
    type : Number,
    enum : [1,2,3,4,5],
  },
  comment :{
    type: String,
    minlength:5
  }
})

ReviewSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);