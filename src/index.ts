// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import adRoutes from './routes/ad.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas backend
// Aquí se montan, ESTA LÍNEA ES LA IMPORTANTE:
app.use('/api', adRoutes);       // → /api/ads
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Arrancar servidor y conectar BD
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
});
