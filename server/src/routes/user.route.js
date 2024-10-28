import express from 'express';
import Login from '../controllers/Login.controller.js';
import Signup from '../controllers/Signup.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import Auth from '../controllers/Auth.controller.js';

const router = express.Router();

// router.get('/', Login);

// POST /api/users - Create a new user
router.post('/Login',Login);
router.post('/Signup',Signup);
router.post('/auth',authMiddleware,Auth);
export default router;
