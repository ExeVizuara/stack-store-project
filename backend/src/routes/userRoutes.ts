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

router.get('/', asyncHandler(getAllUsers));
router.get('/:id', asyncHandler(getUserById));
router.put('/:id', asyncHandler(updateUser));
router.delete('/:id', asyncHandler(deleteUser));

export default router;
