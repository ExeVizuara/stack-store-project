import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { User } from '../models';
import { encryptPassword } from '../models/User';
import { signin, signup } from './auth.controller';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {

  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await encryptPassword(password)
    const user = await UserService.createUser({
      name,
      email,
      password_hash: hashedPassword,
      role,
    });
    const token = await signup(user); // Generar el token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development', // Solo en HTTPS si está en producción
      maxAge: 6 * 60 * 60 * 1000, // Expira en 1 hora
    });
    res.status(201).json({ message: 'Usuario registrado con éxito', token });
  } catch (error) {
    next(error instanceof Error ? error : new Error('Error desconocido en createUser'));
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Email o contraseña incorrectos' });
    }
    const isPasswordCorrect = await user.validatePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Email o contraseña incorrectos' });
    }
    const token = await signin(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development', // Solo en HTTPS si está en producción
      sameSite: 'lax', // Necesario para solicitudes cross-origin
      maxAge: 6 * 60 * 60 * 1000, // Expira en 1 hora (en milisegundos)
    });
    res.status(200).json({ message: `Bienvenido ${user.name}`, token });
    return user;
  } catch (error) {
    next(error instanceof Error ? error : new Error('Se produjo un error'));
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.getAllUsers();
    const sanitizedUsers = users.map(user => {
      const { password_hash, ...rest } = user.toJSON();
      return rest;
    });
    res.status(200).json(sanitizedUsers);
  } catch (error) {
    next(error instanceof Error ? error : new Error('Error desconocido en getAllUsers'));
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const user = await UserService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const { password_hash, ...rest } = user.toJSON();
    res.status(200).json(rest);
  } catch (error) {
    next(error instanceof Error ? error : new Error('Error desconocido en getUserById'));
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const { name, email, password } = req.body;
    const hashedPassword = password;
    const updatedUser = await UserService.updateUser(id, {
      name,
      email,
      password_hash: hashedPassword,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const { password_hash, ...rest } = updatedUser.toJSON();
    res.status(200).json(rest);
  } catch (error) {
    next(error instanceof Error ? error : new Error('Error desconocido en updateUser'));
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const deleted = await UserService.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    next(error instanceof Error ? error : new Error('Error desconocido en deleteUser'));
  }
};
