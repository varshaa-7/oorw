import express from 'express';
import {
  getAllYatras,
  getYatraById,
  createYatra,
  updateYatra,
  deleteYatra
} from '../controllers/yatraController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllYatras);
router.get('/:id', getYatraById);
router.post('/', authMiddleware, createYatra);
router.put('/:id', authMiddleware, updateYatra);
router.delete('/:id', authMiddleware, deleteYatra);

export default router;
