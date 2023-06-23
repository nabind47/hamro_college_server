import express from 'express';
import { forgot, login, refresh, register } from './auth.controller';
import { validateResource } from '../../middlewares/validation.middleware';
import { forgotPasswordSchema, loginUserSchema, registerUserSchema } from './auth.schema';
import { authenticate } from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', validateResource(registerUserSchema), register);
router.post('/login', validateResource(loginUserSchema), login);
router.put('/forgot', authenticate, validateResource(forgotPasswordSchema), forgot);
router.post('/refresh', refresh);

export default router;
