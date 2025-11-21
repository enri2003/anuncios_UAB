import { Router } from 'express';
import { getAds, createAd, updateAd, deleteAd } from '../controllers/ad.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Público: ver anuncios
// GET http://localhost:3000/api/ads
router.get('/ads', getAds);

// Protegido: crear, actualizar y eliminar anuncio
// POST http://localhost:3000/api/ads
router.post('/ads', authMiddleware, createAd);

// PUT http://localhost:3000/api/ads/:id
router.put('/ads/:id', authMiddleware, updateAd);

// DELETE http://localhost:3000/api/ads/:id
router.delete('/ads/:id', authMiddleware, deleteAd);

export default router;
