import express from 'express';
import { loginAdmin, getAdminProfile, registerAdmin } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.get('/profile', authMiddleware, getAdminProfile);

export default router;
