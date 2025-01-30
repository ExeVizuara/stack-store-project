import { Request, Response, NextFunction } from 'express';

import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies?.token;
    console.log('Token recibido:', token); // Log para verificar que el token esté allí
    if (!token) {
      res.status(401).json({ error: 'Acceso no autorizado' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN || 'test') as JwtPayload;
      req.user = { id: decoded.id as string };
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token inválido o expirado' });
      return;
    }
  };
