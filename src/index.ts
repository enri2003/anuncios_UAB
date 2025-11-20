import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

dotenv.config(); // Carga variables de entorno

// Conexión a la base de datos (solo una vez)
connectDB();

// Crea la app Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Ruta de prueba
app.get('/', (_req, res) => {
  res.json({ mensaje: '¡Servidor funcionando correctamente!' });
});

// Puerto
const PORT = process.env.PORT || 3000;

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
