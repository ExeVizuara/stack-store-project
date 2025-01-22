import { Request, Response, NextFunction } from 'express';
import { SaleService } from '../services/saleService';
import { Sale } from '../models';
import { Op } from 'sequelize';
import Product from '../models/Product';

export const createSale = async (req: Request, res: Response, next: NextFunction) => {
  
  const { user_id, products } = req.body;
  
  try {
    const user = await SaleService.createSale({ user_id, products });
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

export const getSalesOfTheDay = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establece la hora a 00:00:00 para comparar solo la fecha

    const filteredSales = await Sale.findAll({
      where: {
        createdAt: {
          [Op.gte]: today // Filtra ventas creadas desde el inicio del día
        }
      },
      include: [
        {
          model: Product,
          through: { attributes: ['quantity'] } // Incluye los productos y sus cantidades
        }
      ]
    });

    res.status(200).json(filteredSales);
  } catch (error) {
    console.error('Error al obtener las ventas del día:', error);
    res.status(500).json({ error: 'Error al obtener las ventas del día' });
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
