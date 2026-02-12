const express = require('express')
const router = express.Router()

const { authenticateUser } = require('../middleware/authentication')

const { addReview, getProductReviews, deleteReview } = require('../controllers/reviewController')

router.get('/product/:productId', getProductReviews)

router.use(authenticateUser)

router.post('/', addReview)
router.delete('/:id', deleteReview)

module.exports = router