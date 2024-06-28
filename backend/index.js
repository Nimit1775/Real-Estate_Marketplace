import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(() =>{
    console.log('MongoDB connected');
})
.catch((err)=>{
    console.log(err);
})
const app = express();
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.use(express.json()); 
app.use(cookieParser()); 
app.get('/' , (req , res) =>{
    res.send('Welcome to Home Page');
})
app.use('/api/user' , userRouter );
app.use('/api/auth' , authRouter );

app.use((err , req , res , next) =>{
  const statuscode = err.statuscode || 500;
  const message = err.message || 'Internal Server Error';
  return  res.status(statuscode).json ({
    success : false,
    statuscode, 
    message , 
  });
}); 