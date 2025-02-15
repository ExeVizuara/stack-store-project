import { Request, Response, NextFunction } from 'express';

export const validateFieldsInCreateProduct = (req: Request, res: Response, next: NextFunction) => { 
    const requiredFields = ['name', 
        'category', 
        'code', 
        'expiration', 
        'stock', 
        'cost', 
        'discount', 
        'price'
    ];
    const allFieldsPresent = requiredFields.every(field => req.body.hasOwnProperty(field));
    if (!allFieldsPresent) { 
        res.status(400).json({ error: 'Todos los campos son obligatorios' }); 
        return;
    } next(); 
}; 

export const validateFieldsInSignup = (req: Request, res: Response, next: NextFunction) => { 
    const requiredFields = ['name', 
        'email', 
        'password', 
        'role'
    ];
    const allFieldsPresent = requiredFields.every(field => req.body[field]); 
    if (!allFieldsPresent) { 
        res.status(400).json({ error: 'Todos los campos son obligatorios' }); 
        return;
    } next(); 
}; 

export const validateFieldsInSignin = (req: Request, res: Response, next: NextFunction) => { 
    const requiredFields = ['email', 'password'];
    const allFieldsPresent = requiredFields.every(field => req.body[field]); 
    if (!allFieldsPresent) { 
        res.status(400).json({ error: 'Todos los campos son obligatorios' }); 
        return;
    } next(); 
}; 
