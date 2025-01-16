import { Request, Response, NextFunction } from 'express';
import { SaleService } from '../services/saleService';

export const createSale = async (req: Request, res: Response, next: NextFunction) => {
  
  const { user_id, product_id, product_name, product_category, product_quantity, product_price } = req.body;
  
  try {
    const user = await SaleService.createSale({
      user_id,
      product_id,
      product_name,
      product_category,
      product_quantity,
      product_price
    });
    res.status(201).json({ message: 'Venta registrada con éxito' });
  } catch (error) {
    next(error instanceof Error ? error : new Error('Error desconocido en createSale'));
  }
};

export const getAllSales = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sales = await SaleService.getAllSales();
    return sales;
    res.status(200).json(sales);
  } catch (error) {
    next(error instanceof Error ? error : new Error('Error desconocido en getAllSales'));
  }
};

export const getSaleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const sale = await SaleService.getSaleById(id);
    if (!sale) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    res.status(200).json(sale);
  } catch (error) {
    next(error instanceof Error ? error : new Error('Error desconocido en getSaleById'));
  }
};

export const deleteSale = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const deleted = await SaleService.deleteSale(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Venta no encontrada'});
    }
    res.status(200).json({ message: 'Venta eliminada correctamente' });
  } catch (error) {
    next(error instanceof Error ? error : new Error('Error desconocido en deleteSale'));
  }
};
