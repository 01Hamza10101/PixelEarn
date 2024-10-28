import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import {JWT_SECRET} from '../../constants.js';

async function Login(req, res) {
    try {
        const user = await User.findOne({ Email: req.body?.Email });
        // console.log(user,req.body);
        if (!user) {
            return res.status(200).json({message:{
                msg: "User Not Registered"
            }});
        };

        const isMatch = await bcrypt.compare(req.body.Password, user.Password);
        if (!isMatch) {
            return res.status(200).json({message:{
                success: false,
                msg:"Invalid Passowrd",
            }});
        };

        if (user.Email == req.body.Email) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).json({ data:{
                token:token
            } , message:{
                success: true,
                msg:"User Logged In",
            }});
        } else {
            return res.status(200).json({message:{
                success: false,
                msg: "Unauthorized"
            }});
        }

    } catch (error) {
        // console.error("Error logging in user:", error);
        Next(new ErrorHandler(500,"Error logging in user"))
        // res.status(500).json({ error: "Internal server error" }); // Handle error response
    }
}

export default Login;