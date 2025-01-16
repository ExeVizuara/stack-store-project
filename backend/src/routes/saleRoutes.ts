import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import {
  createSale,
  getAllSales,
  getSaleById,
  deleteSale,
} from '../controllers/saleController';


const router = Router();

router.get('/users', asyncHandler(getAllSales));
router.get('/users/:id', asyncHandler(getSaleById));
router.delete('/users/:id', asyncHandler(deleteSale));

export default router;
