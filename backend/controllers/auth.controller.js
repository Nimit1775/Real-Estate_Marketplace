import User from '../models/user.model.js';  
import bcrypt from 'bcrypt';  
import { errorHandler } from '../utils/error.js';  
import jwt from 'jsonwebtoken'; 

// Function to hash the password
const hashPassword = async (password) => {
  const saltRounds = 10;  
  return await bcrypt.hash(password, saltRounds);  
};

// Signup handler
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body; 
  
  console.log('Received data:', req.body);  


  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
   
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

   
    await newUser.save();
    res.status(201).json("User created successfully");

  } catch (error) {
    
    next(error);
  }
};

// Signin handler
export const signin = async (req, res, next) => {
  const { email, password } = req.body;  

  try {
    
    const validUser = await User.findOne({ email });
    if (!validUser) {
      
      return next(errorHandler(404, "User not found"));
    }

  
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }

    
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    
    const { password: pass, ...rest } = validUser._doc;

   
    res.cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);

  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({})

  }
  catch (error) {
    next(error);
  }
}
