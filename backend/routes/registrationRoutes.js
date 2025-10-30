import express from 'express';
import {
  createRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistrationStatus,
  deleteRegistration
} from '../controllers/registrationController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createRegistration);
router.get('/', authMiddleware, getAllRegistrations);
router.get('/:id', authMiddleware, getRegistrationById);
router.put('/:id', authMiddleware, updateRegistrationStatus);
router.delete('/:id', authMiddleware, deleteRegistration);

export default router;
