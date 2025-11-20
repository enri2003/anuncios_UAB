import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// ========== REGISTRO ADMIN ==========
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'Faltan datos' });
    }

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(409).json({ mensaje: 'El email ya está registrado' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const nuevo = await User.create({
      name: nombre,       // 👈 campo del modelo
      email,
      password: hashed,
      role: 'admin',      // 👈 campo del modelo
    });

    res.status(201).json({
      mensaje: 'Admin registrado correctamente',
      usuario: {
        id: nuevo._id,
        nombre: nuevo.name,   // 👈
        email: nuevo.email,
        rol: nuevo.role,      // 👈
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// ========== LOGIN ==========
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log('BODY LOGIN:', { email, password });

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Faltan datos' });
    }

    const usuario = await User.findOne({ email });
    console.log('USUARIO ENCONTRADO:', usuario);

    if (!usuario) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas (email)' });
    }

    const esValido = await bcrypt.compare(password, usuario.password);
    console.log('PASSWORD VALIDA?:', esValido);

    if (!esValido) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas (password)' });
    }

    const userId = usuario._id as unknown as string;

    const token = jwt.sign(
      { id: userId, rol: usuario.role },   // 👈 role del modelo
      JWT_SECRET
    );

    return res.json({
      success: true,
      message: 'Login exitoso',
      token,
      usuario: {
        id: userId,
        nombre: usuario.name,  // 👈
        email: usuario.email,
        rol: usuario.role,     // 👈
      },
    });
  } catch (error) {
    console.error('ERROR LOGIN:', error);
    return res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};
