import { Router } from 'express';
import {
  getCareerAds,
  createCareerAd,
  updateCareerAd,
  deleteCareerAd
} from '../controllers/careerAd.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

// Público: ver anuncios de una carrera
// GET /api/career-ads/Ingeniería%20de%20Sistemas
router.get('/career-ads/:carrera', getCareerAds);

// Protegido admin: crear anuncio para una carrera
router.post('/career-ads/:carrera', authMiddleware, createCareerAd);

// Protegido admin: actualizar y eliminar por id
router.put('/career-ads/:id', authMiddleware, updateCareerAd);
router.delete('/career-ads/:id', authMiddleware, deleteCareerAd);

export default router;
