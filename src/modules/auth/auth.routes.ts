import express from 'express';
import { change, forgot, getProfile, login, refresh, register } from './auth.controller';
import { validateResource } from '../../middlewares/validation.middleware';
import {
  chnagePasswordSchema,
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
} from './auth.schema';
import { authenticate } from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', validateResource(registerUserSchema), register);
router.post('/login', validateResource(loginUserSchema), login);
router.put('/forgot', validateResource(forgotPasswordSchema), forgot);
router.put('/change', validateResource(chnagePasswordSchema), authenticate, change);
router.get('/profile', authenticate, getProfile);
router.post('/refresh', refresh);

export default router;
