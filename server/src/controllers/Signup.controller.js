import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import Wallet from '../models/wallet.model.js';
import { ErrorHandler } from '../utils/errorHandler.js';

async function Register(req, res, next) {
    try {
        // Check if the user is already registered
        const userExists = await User.findOne({ Email: req.body?.Email });
        if (userExists) {
            return res.status(400).json({
                message: { success: false, statusCode: 400, msg: "User already registered" }
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);

        // Create a new user
        const newUser = new User({
            Name: req.body.Name,
            Email: req.body.Email,
            Password: hashedPassword,
        });

        // Save the new user
        await newUser.save();

        // Create a wallet for the new user
        const newWallet = new Wallet({
            UserId: newUser._id,
            Pxbalance: req.body.referralId ? 100 : 0
        });
        await newWallet.save();
        console.log("Wallet saved:", newWallet);

        // If there is a referral ID, update the referral's wallet
        if (req.body.referralId) {
            await Wallet.findOneAndUpdate(
                { UserId: req.body.referralId },
                {
                    $push: {
                        InviteList: {
                            UserId: newUser._id,
                            Name: newUser.Name
                        }
                    }
                    ,
                    $inc:{
                        Pxbalance:100
                    }
                },
                { new: true }
            );
        }

        // Respond with the new user's data
        res.status(200).json({
            data: {
                Name: newUser.Name,
                Email: newUser.Email,
            },
            message: {
                success: true,
                msg: "New user registered"
            }
        });
        
    } catch (error) {
        console.error("Error registering user:", error);
        next(new ErrorHandler(500, "Internal server error"));
    }
}

export default Register;
