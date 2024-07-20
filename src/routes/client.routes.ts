import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { ClientsController } from '../controllers/client/client.controller';

const router = Router();
const client = new ClientsController();


router.post('/posts', authenticate(['Client']), client.createJobPost);
router.get('/posts', authenticate(['Client']), client.getAllJobPosts);

export default router;
