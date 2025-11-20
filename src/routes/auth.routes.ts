import { Router } from 'express';
import { registerAdmin, login } from '../controllers/auth.controller';

const router = Router();

// POST /api/auth/register
router.post('/register', registerAdmin);

// POST /api/auth/login
router.post('/login', login);

export default router;
