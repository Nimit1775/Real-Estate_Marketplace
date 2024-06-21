import User from '../models/user.model.js';
import bcryptjs from 'bcrypt';
export const signup =  async ( req , res , next  )=>{

    const { username , email , password } =  req.body;
    console.log('Received data:', req.body); // Debugging log
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }
      try {
    const hashPass = bcryptjs.hashSync(password , 10);
     const newUser = new User({
         username , email , password : hashPass
     });
   
        await newUser.save()
        res.status(201).json("user created successfully")    
    }
        catch (error) {
            next(error); 

        }
    };
   