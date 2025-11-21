import { Request, Response } from 'express';
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

    // Guardamos la contraseña en texto plano (solo para este proyecto)
    const nuevo = await User.create({
      name: nombre,
      email,
      password,      // SIN hash
      role: 'admin',
    });

    res.status(201).json({
      mensaje: 'Admin registrado correctamente',
      usuario: {
        id: nuevo._id,
        nombre: nuevo.name,
        email: nuevo.email,
        rol: nuevo.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// ========== REGISTRO USUARIO NORMAL ==========
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'Faltan datos' });
    }

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(409).json({ mensaje: 'El email ya está registrado' });
    }

    const nuevo = await User.create({
      name: nombre,
      email,
      password,      // SIN hash
      role: 'user',
    });

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      usuario: {
        id: nuevo._id,
        nombre: nuevo.name,
        email: nuevo.email,
        rol: nuevo.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

// ========== LOGIN (COMPARACIÓN DIRECTA) ==========
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas (email)',
      });
    }

    console.log('USUARIO ENCONTRADO:', usuario);
    console.log('PASSWORD ENVIADO:', password);
    console.log('PASSWORD BD:', usuario.password);

    // Comparación directa texto plano
    if (password !== usuario.password) {
      console.log('COMPARACIÓN:', `"${password}"`, '!==', `"${usuario.password}"`);
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas (password)',
      });
    }

    const userId: string = (usuario._id as any).toString();

    const token = jwt.sign(
      { id: userId, role: usuario.role },
      JWT_SECRET,
      { expiresIn: '4h' }
    );

    return res.json({
      success: true,
      message: 'Login exitoso',
      token,
      usuario: {
        id: userId,
        nombre: usuario.name,
        email: usuario.email,
        rol: usuario.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor',
    });
  }
};
