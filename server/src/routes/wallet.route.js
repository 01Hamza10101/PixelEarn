import express from 'express';

// import { getUsers, createUser } from '../controllers/userController.js';
import Wallet from '../controllers/GetWalletdata.controller.js';
import Leaderboard from '../controllers/Leaderboard.controller.js';
import LevelUPBoosts from '../controllers/LevelUPBoosts.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import PaintPixel from '../controllers/PaintMinePixel.controller.js';
import ADDTaskComp from '../controllers/TaskComp.controller.js';

const router = express.Router();

// GET /api/users - Get all users
// router.get('/', getUsers);

// POST /api/users - Create a new user
router.post('/Wallet',authMiddleware, Wallet);
router.post('/LevelUPBoosts',authMiddleware,LevelUPBoosts);
router.post('/PaintPixel',authMiddleware,PaintPixel);
router.post('/AddTask',authMiddleware,ADDTaskComp)
router.get('/Leaderboard',Leaderboard);

export default router;
