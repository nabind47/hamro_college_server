import { Router } from 'express';
import { attendence } from './students.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);
router.get('/attendence', attendence);
export default router;
