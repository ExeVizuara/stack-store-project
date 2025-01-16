import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    // Manejo de errores con status personalizados
    const statusCode = (err as any).status || 500;

    console.error(`Error [${statusCode}]: ${err.message}`);
    res.status(statusCode).json({
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Mostrar stack solo en desarrollo
    });
  } else {
    console.error('Error desconocido:', err);
    res.status(500).json({
      error: 'Error desconocido',
    });
  }
};
