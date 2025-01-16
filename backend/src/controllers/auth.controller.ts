import { Request, Response } from "express"
import { User } from "../models";
import jwt from "jsonwebtoken";


export const signup = async (user: User) => {
    const token: string = jwt.sign({ id: user.id }, process.env.JWT_TOKEN || 'test', {
        expiresIn: '1h',
    });
    console.log('Usuario registrado con éxito', user, token);
    return token;
}

export const signin = async (user: User) => {
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_TOKEN || 'test', {
        expiresIn: '1h',
    });
    console.log('Logueado correctamente');
    return token;
}

export const signout = async (req: Request, res: Response) => {
  res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development',
      sameSite: 'strict',
  });
  res.status(200).json({ message: 'Cierre de sesión exitoso' });
};

export const profile = (req: Request, res: Response) => {
    res.send('profile');
}