import { Request, Response } from 'express';
import { User } from '../models/user.model';

// GET /api/users  (lista todos los usuarios sin password)
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const usuarios = await User.find().select('-password');
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};
