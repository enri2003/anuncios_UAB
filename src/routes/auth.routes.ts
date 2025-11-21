import { Router } from 'express';
import { login, registerAdmin, registerUser } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login);
router.post('/register-admin', registerAdmin);
router.post('/register', registerUser);

export default router;
