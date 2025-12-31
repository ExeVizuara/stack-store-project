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

export const getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.params;
    const filteredProducts = await ProductService.getProductByCategory(category);
    res.status(200).json(filteredProducts);
  } catch (error) {
    next(error);
  }
}

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

export const updateProductStock = async (req: Request, res: Response) => {
  try {
      const { stock } = req.body;
      const { id } = req.params;
      console.log(stock, id);

      if (!id || stock < 0) {
          return res.status(400).json({ message: 'ID del producto y stock son requeridos' });
      }

      const updatedProduct = await ProductService.updateProductStock(Number(id), Number(stock));

      return res.status(200).json(updatedProduct);
  } catch (error) {
      return res.status(500).json({ message: error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      const productId = Number(id);

      // Validar que el ID sea un número válido
      if (isNaN(productId)) {
          return res.status(400).json({ error: 'ID inválido. Debe ser un número.' });
      }

      const productData = req.body;

      // Validar que productData existe y no esté vacío
      if (!productData || Object.keys(productData).length === 0) {
          return res.status(400).json({ error: 'Los datos del producto son requeridos para la actualización.' });
      }

      const updatedProduct = await ProductService.updateProduct(productId, productData);

      return res.status(200).json(updatedProduct);
  } catch (error: any) {
      console.error('Error al actualizar el producto:', error);
      return res.status(500).json({ error: error.message || 'Error interno del servidor.' });
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
    console.log(error);
    next(error);
  }
};