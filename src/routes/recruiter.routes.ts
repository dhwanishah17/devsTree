import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { RecruiterController } from '../controllers/recruiter/recruiter.controller';

const router = Router();
const recruiter = new RecruiterController();


router.get('/posts', authenticate(['Recruiter']), recruiter.getAssignedPosts);
router.post('/notes', authenticate(['Recruiter']), recruiter.addNoteToPost);

export default router;
