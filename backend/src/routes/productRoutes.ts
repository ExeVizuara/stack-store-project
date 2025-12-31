import { Router } from 'express';
import { createProduct, getProducts, getProductById, deleteProduct, getProductsByCategory, updateProductStock, updateProduct } from '../controllers/productController';
import { asyncHandler } from '../middleware/asyncHandler';
import { validateFieldsInCreateProduct as validateFields } from "../middleware/validateFields";

const router = Router();

router.post('/create', validateFields, asyncHandler(createProduct));
router.get('/getAll', asyncHandler(getProducts));
router.get('/getbycategory/:category', asyncHandler(getProductsByCategory));
router.put('/stock/:id', asyncHandler(updateProductStock));
router.put('/:id', asyncHandler(updateProduct));
router.get('/getbyid/:id', asyncHandler(getProductById));
router.delete('/delete/:id', asyncHandler(deleteProduct));

export default router;