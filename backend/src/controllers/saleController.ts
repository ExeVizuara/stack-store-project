import { Request, Response, NextFunction } from 'express';
import { SaleService } from '../services/saleService';
import { Sale } from '../models';
import { Op } from 'sequelize';
import moment from "moment-timezone";

export const createSale = async (req: Request, res: Response, next: NextFunction) => {
  const { products, quantity, total } = req.body;
  const user_id = Number(req.user?.id);

  if (isNaN(user_id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  if (!user_id || !products || !quantity) {
    return res.status(400).json({ message: 'Faltan parámetros obligatorios' });
  }

  try {
    const sale = await SaleService.createSale({ user_id, products }, quantity, total);
    res.status(201).json({ message: 'Venta registrada con éxito', sale });
  } catch (error) {
    console.error('Error al registrar la venta:', error);
    next(error);
  }
};

export const getAllSales = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sales = await SaleService.getAllSales();
    res.status(200).json(sales);
    return sales;
  } catch (error) {
    next(error instanceof Error ? error : new Error('Error desconocido en getAllSales'));
  }
};

export const getSalesOfTheDay = async (date: string) => {
  try {
    // Convierte el formato DD/MM/YYYY a YYYY-MM-DD
    const [day, month, year] = date.split('/');
    const formattedDate = `${year}-${month}-${day}`; // Formato ISO compatible

    const sales = await Sale.findAll({
      where: {
        createdAt: {
          [Op.between]: [`${formattedDate} 00:00:00`, `${formattedDate} 23:59:59`],
        },
      },
    });

    return sales;
  } catch (error) {
    throw new Error('Error al obtener ventas por fecha');
  }
};

export const getSalesByDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: "Se requiere una fecha válida" });
    }

    console.log(date);
    const startOfDay = new Date(date + 'T00:00:00');
    console.log(startOfDay);
    const endOfDay = new Date(date + 'T23:59:59');
    console.log(startOfDay);

    const sales = await Sale.findAll({
      where: {
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });
    res.json(sales);
  } catch (error) {
    console.error("Error al obtener ventas diarias:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getSaleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const sale = await SaleService.getSaleById(id);

    if (!sale) { return res.status(404).json({ error: 'Venta no encontrada' }); }
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
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    res.status(200).json({ message: 'Venta eliminada correctamente' });
  } catch (error) {
    next(error instanceof Error ? error : new Error('Error desconocido en deleteSale'));
  }
};
