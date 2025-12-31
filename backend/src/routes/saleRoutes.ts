import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import {
  createSale,
  getAllSales,
  getSaleById,
  deleteSale,
  getSalesByDate,
} from '../controllers/saleController';


const router = Router();

router.get('/getall', asyncHandler(getAllSales));
router.post('/create', asyncHandler(createSale));
router.get('/daily', asyncHandler(getSalesByDate));
router.get('/:id', asyncHandler(getSaleById));
router.delete('/:id', asyncHandler(deleteSale));

export default router;
