// auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWT_SECRET } from '../../constants.js';
import {handleError} from '../utils/errorHandler.js';

const authMiddleware = async (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        // Verify token
        const decoded = jwt.verify(token,JWT_SECRET);
        
        // Find user by decoded token
        const user = await User.findById(decoded.userId);
        // console.log(user)
        if (!user) {
            return res.status(201).json({ msg: 'Token is not valid' ,origin:1});
        }
        // Attach user object to request for further use in routes
        req.user = user;
        next();
        // res.status(200).json(user);
    } catch (error) {
        // console.error('Error decoding token:', error);
        return res.status(500).json({ error , msg: 'Token is not valid' ,origin:2});
        // next(handleError(500, 'Token is not valid'));
        // ErrorHandler();
    }
};

export default authMiddleware;