import { Router } from 'express';
import { getAds, createAd, updateAd, deleteAd } from '../controllers/ad.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Público: ver anuncios
router.get('/', getAds);

// Protegido: crear, actualizar y eliminar anuncio
router.post('/', authMiddleware, createAd);
router.put('/:id', authMiddleware, updateAd);
router.delete('/:id', authMiddleware, deleteAd);

export default router;
