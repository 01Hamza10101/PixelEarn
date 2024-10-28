import express from 'express';

// import { getUsers, createUser } from '../controllers/userController.js';
// import Wallet from '../controllers/GetWalletdata.controller.js';
import TaskBoosts from '../controllers/TasksBoosts.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// GET /api/users - Get all users
// router.get('/', getUsers);

// POST /api/users - Create a new user
router.get('/TasksBoosts',authMiddleware,TaskBoosts);
// router.get('/Leaderboard',Leaderboard);

export default router;
