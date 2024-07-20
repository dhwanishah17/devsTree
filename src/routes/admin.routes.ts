import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { AdminController } from '../controllers/admin/admin.controller';

const router = Router();
const admin = new AdminController();
router.post('/recruiters', authenticate(['Admin']), admin.createRecruiter);
router.get('/recruiters', authenticate(['Admin']), admin.getAllRecruiters);
router.get('/clients', authenticate(['Admin']), admin.getAllClients);

export default router;
