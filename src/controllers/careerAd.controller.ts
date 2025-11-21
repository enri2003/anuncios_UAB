import { Request, Response } from 'express';
import CareerAd from '../models/careerAd.model';

// GET /api/career-ads/:carrera
export const getCareerAds = async (req: Request, res: Response) => {
  try {
    const carrera = decodeURIComponent(req.params.carrera);
    const anuncios = await CareerAd.find({ carrera }).sort({ createdAt: -1 });
    res.json(anuncios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener anuncios de carrera' });
  }
};

// POST /api/career-ads/:carrera
export const createCareerAd = async (req: Request, res: Response) => {
  try {
    const carrera = decodeURIComponent(req.params.carrera);
    const { titulo, descripcion, horaInicio, horaFin } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({ mensaje: 'Faltan datos del anuncio de carrera' });
    }

    const user = (req as any).user;

    const nuevo = await CareerAd.create({
      carrera,
      titulo,
      descripcion,
      horaInicio: horaInicio || null,
      horaFin: horaFin || null,
      creadoPor: user.id
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear anuncio de carrera' });
  }
};

// PUT /api/career-ads/:id
export const updateCareerAd = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, horaInicio, horaFin } = req.body;

    const actualizado = await CareerAd.findByIdAndUpdate(
      id,
      {
        titulo,
        descripcion,
        horaInicio: horaInicio || null,
        horaFin: horaFin || null
      },
      { new: true }
    );

    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Anuncio no encontrado' });
    }

    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar anuncio de carrera' });
  }
};

// DELETE /api/career-ads/:id
export const deleteCareerAd = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eliminado = await CareerAd.findByIdAndDelete(id);

    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Anuncio no encontrado' });
    }

    res.json({ mensaje: 'Anuncio eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar anuncio de carrera' });
  }
};
