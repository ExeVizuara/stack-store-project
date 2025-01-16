import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController';


const router = Router();

router.get('/users', asyncHandler(getAllUsers));
router.get('/users/:id', asyncHandler(getUserById));
router.put('/users/:id', asyncHandler(updateUser));
router.delete('/users/:id', asyncHandler(deleteUser));

export default router;
