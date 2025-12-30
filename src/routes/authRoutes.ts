import { Router } from "express";
import * as authController from '../controllers/authController.ts';

const router = Router()

router.get('/login', authController.loginGet)

router.post('/login', authController.loginPost)

router.get('/createAdmin', authController.createAdminGet)

router.post('/createAdmin', authController.createAdminPost)

router.get('/logout', authController.logoutGet)

export default router;