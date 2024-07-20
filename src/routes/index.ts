import express from 'express';


import authRoutes from './auth.routes';
import adminRoutes from './admin.routes';
import recruiterRoutes from './recruiter.routes';
import clientRoutes from './client.routes';

const router = express.Router();

router.use('/users', authRoutes);
router.use('/admins', adminRoutes);
router.use('/recruiters', recruiterRoutes);
router.use('/clients', clientRoutes);


export default router;