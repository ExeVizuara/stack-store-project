import { Request, Response, NextFunction } from 'express';

import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    console.log('Cookies:', req.cookies);
    const token = req.cookies?.token;
    if (!token) {
        res.status(401).json({ error: 'Acceso no autorizado' });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN || 'test');
        req.user = decoded;
        next();
    } catch (error: unknown) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ error: 'Token expirado. Por favor, inicia sesión nuevamente.' });
            return;
        }
        res.status(401).json({ error: 'Token inválido o expirado' });
        return;
    }
};
