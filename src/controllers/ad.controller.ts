import { Request, Response } from 'express';
import Ad from '../models/ad.model';

// GET /api/ads  (anuncios generales)
export const getAds = async (_req: Request, res: Response) => {
  try {
    // solo anuncios generales
    const anuncios = await Ad.find({ categoria: 'general' }).sort({ createdAt: -1 });
    res.json(anuncios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener anuncios' });
  }
};

// POST /api/ads  (crear anuncio general)
export const createAd = async (req: Request, res: Response) => {
  try {
    const { titulo, descripcion, categoria, horaInicio, horaFin } = req.body;

    if (!titulo || !descripcion || !categoria) {
      return res.status(400).json({ mensaje: 'Faltan datos del anuncio' });
    }

    const user = (req as any).user;

    const nuevo = await Ad.create({
      titulo,
      descripcion,
      categoria,                     // normalmente 'general'
      horaInicio: horaInicio || null,
      horaFin: horaFin || null,
      creadoPor: user.id
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear anuncio' });
  }
};

// PUT /api/ads/:id  (actualizar anuncio general)
export const updateAd = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, categoria, horaInicio, horaFin } = req.body;

    const actualizado = await Ad.findByIdAndUpdate(
      id,
      {
        titulo,
        descripcion,
        categoria,
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
    res.status(500).json({ mensaje: 'Error al actualizar anuncio' });
  }
};

// DELETE /api/ads/:id  (eliminar anuncio general)
export const deleteAd = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const eliminado = await Ad.findByIdAndDelete(id);

    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Anuncio no encontrado' });
    }

    res.json({ mensaje: 'Anuncio eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar anuncio' });
  }
};
