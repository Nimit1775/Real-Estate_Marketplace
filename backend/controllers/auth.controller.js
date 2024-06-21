import User from '../models/user.model.js';
import bcryptjs from 'bcrypt';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
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

    export const signin  = async ( req , res , next )=>{
        const { email , password } = req.body;
        try {
            const validuser = await User.findOne({ email });
            if (!validuser) {
                return next(errorHandler(404, "User not found"));
            }
            const validPassword = bcryptjs.compareSync(password, validuser.password);
            if (!validPassword) {
                return next(errorHandler(401, "wrong credentials"));
            }
            const token = jwt.sign({ id : validuser._id } , process.env.JWT_SECRET );
            const {password : pass, ...rest}=validuser._doc;
            res.cookie('access_token' , token , { httpOnly : true }).status(200).json(rest);

            

    }
    catch (error) {
        next(error); 
    }
    };
   