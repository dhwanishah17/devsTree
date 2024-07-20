import { Router } from 'express';
import { AuthController } from '../controllers/auth/auth.controller';

const router = Router();
const auth = new AuthController();


router.post('/register', auth.register);
router.post('/login', auth.login);

export default router;
