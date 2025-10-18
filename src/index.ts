import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/database';

dotenv.config(); // Carga variables de entorno

// Conexión a la base de datos
connectDB();

// Crea la app Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (_req, res) => {
  res.json({ mensaje: '¡Servidor funcionando correctamente!' });
});

// Puerto
const PORT = process.env.PORT || 3000;

// Inicializa el servidor solo cuando la base de datos está conectada
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/anuncios_uab')
  .then(() => {
    console.log("Conexión exitosa a MongoDB");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  });
