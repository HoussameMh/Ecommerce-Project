require('dotenv').config();
const cors= require('cors') ;
const express = require('express');
const app = express();
const connectDB = require('./db/connect');

//routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const cartRouter = require('./routes/cartRoutes')
const orderRouter = require('./routes/orderRoutes')
const reviewRouter = require('./routes/reviewRoutes')

app.use(cors({
  origin: 'https://nova-market-web.vercel.app' ,
  credentials: true
}));
app.use(express.json());


// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/reviews', reviewRouter)




const port = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));


if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => console.log(`Server listening on port ${port}...`));
}

module.exports = app;