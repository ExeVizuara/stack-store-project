import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import {
  createSale,
  getAllSales,
  getSaleById,
  deleteSale,
  getSalesOfTheDay,
} from '../controllers/saleController';


const router = Router();

router.get('/', asyncHandler(getAllSales));
router.get('/today', asyncHandler(getSalesOfTheDay));
router.get('/:id', asyncHandler(getSaleById));
router.delete('/:id', asyncHandler(deleteSale));

export default router;
