import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/productService';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name,
        category,
        code,
        expiration,
        stock,
        cost,
        discount,
        price
     } = req.body;

    const product = await ProductService.createProduct({ name, 
        category, 
        code,
        expiration,
        stock,
        cost,
        discount,
        price 
    });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await ProductService.getProducts();
    const sanitizedProducts = products.map(({ created_at, ...rest }) => rest);
    res.status(200).json(sanitizedProducts);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const productId = Number(id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const product = await ProductService.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const productId = Number(id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const deleted = await ProductService.deleteProduct(productId);

    if (!deleted) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    next(error);
  }
};