import { Request, Response } from 'express';
import { Ad } from '../models/ad.model';

// GET /api/ads
export const getAds = async (_req: Request, res: Response) => {
  try {
    const anuncios = await Ad.find().sort({ creadoEn: -1 });
    res.json(anuncios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener anuncios' });
  }
};

// POST /api/ads
export const createAd = async (req: Request, res: Response) => {
  try {
    const { titulo, descripcion, categoria, precio } = req.body;

    if (!titulo || !descripcion || !categoria) {
      return res.status(400).json({ mensaje: 'Faltan datos del anuncio' });
    }

    const user = (req as any).user;

    const nuevo = await Ad.create({
      titulo,
      descripcion,
      categoria,
      precio,
      creadoPor: user.id,
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear anuncio' });
  }
};

// PUT /api/ads/:id
export const updateAd = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, categoria, precio } = req.body;

    const actualizado = await Ad.findByIdAndUpdate(
      id,
      { titulo, descripcion, categoria, precio },
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

// DELETE /api/ads/:id
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
