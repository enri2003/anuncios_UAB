import { Router } from 'express';
import { getAds, createAd, updateAd, deleteAd } from '../controllers/ad.controller';
import {
  getCareerAds,
  createCareerAd,
  updateCareerAd,
  deleteCareerAd
} from '../controllers/careerAd.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// ====================
// Anuncios generales
// ====================

// Público: ver anuncios generales
// GET http://localhost:3000/api/ads
router.get('/ads', getAds);

// Protegido admin: crear anuncio general
// POST http://localhost:3000/api/ads
router.post('/ads', authMiddleware, createAd);

// Protegido admin: actualizar anuncio general
// PUT http://localhost:3000/api/ads/:id
router.put('/ads/:id', authMiddleware, updateAd);

// Protegido admin: eliminar anuncio general
// DELETE http://localhost:3000/api/ads/:id
router.delete('/ads/:id', authMiddleware, deleteAd);

// ====================
// Anuncios por carrera
// ====================

// Público: ver anuncios de una carrera específica
// GET http://localhost:3000/api/career-ads/Ingeniería%20de%20Sistemas
router.get('/career-ads/:carrera', getCareerAds);

// Protegido admin: crear anuncio para una carrera
// POST http://localhost:3000/api/career-ads/Ingeniería%20de%20Sistemas
router.post('/career-ads/:carrera', authMiddleware, createCareerAd);

// Protegido admin: actualizar anuncio de carrera por id
// PUT http://localhost:3000/api/career-ads/:id
router.put('/career-ads/:id', authMiddleware, updateCareerAd);

// Protegido admin: eliminar anuncio de carrera por id
// DELETE http://localhost:3000/api/career-ads/:id
router.delete('/career-ads/:id', authMiddleware, deleteCareerAd);

export default router;
