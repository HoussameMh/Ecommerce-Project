require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/connect');

//routers
const authRouter=require('./routes/authRoutes')
const userRouter=require('./routes/userRoutes')


app.use(express.json());


// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)


const port=3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start()