import express from 'express';
import { forgot, login, refresh, register } from './auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot', forgot);
router.post('/refresh', refresh);

export default router;
