'use strict';

import { Router } from 'express';
import { register, login } from './auth.controller.js';

const router = Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Registrar usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               dpi:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               job:
 *                 type: string
 *               monthlyIncome:
 *                 type: number
 *     responses:
 *       201:
 *         description: Registro exitoso
 */
router.post('/register', register);


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 */
router.post('/login', login);

export default router;