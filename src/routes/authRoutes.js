// src/routes/authRoutes.js

import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUser, loginUser, logoutUser, refreshUserSession, requestResetEmail } from '../controllers/authController.js';
import { registerUserSchema, loginUserSchema, requestResetEmailSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserSchema), loginUser);
router.post('/auth/request-reset-email', celebrate(requestResetEmailSchema), requestResetEmail);
router.post('/auth/logout', logoutUser);
router.post('/auth/refresh', refreshUserSession);
export default router;
