'use strict';
console.log('User routes loaded');
import { Router } from 'express';
import {
  getPendingUsers,
  approveUser,
  updateUser
} from './user.controller.js';

import { validateJWT } from '../../middlewares/validate-JWT.js';
import { validateAdmin } from '../../middlewares/validate-role.js';

const router = Router();


/**
 * @swagger
 * /api/v1/users/pending:
 *   get:
 *     summary: Obtener usuarios pendientes
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios pendientes
 */
router.get('/pending', validateJWT, validateAdmin, getPendingUsers);


/**
 * @swagger
 * /api/v1/users/approve:
 *   put:
 *     summary: Aprobar usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: CLIENT
 *     responses:
 *       200:
 *         description: Usuario aprobado
 */
router.put('/approve', validateJWT, validateAdmin, approveUser);


/**
 * @swagger
 * /api/v1/users/update/{userId}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Username:
 *                 type: string
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *               DPI:
 *                 type: string
 *               Address:
 *                 type: string
 *               Phone:
 *                 type: string
 *               Job:
 *                 type: string
 *               MonthlyIncome:
 *                 type: number
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put('/update/:userId', validateJWT, validateAdmin, updateUser);

export default router;