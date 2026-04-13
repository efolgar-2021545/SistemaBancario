'use strict';

import { Router } from 'express';
import { createAccount, getAccounts, getAccountById, updateAccount, deleteAccount } from './account.controller.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateAdmin } from '../middlewares/validate-admin.js';

const router = Router();


/**
 * @swagger
 * /api/v1/accounts/create:
 *   post:
 *     summary: Crear cuenta bancaria
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ownerId:
 *                 type: string
 *               accountType:
 *                 type: string
 *                 example: AHORRO
 *               currency:
 *                 type: string
 *                 example: GTQ
 *               balance:
 *                 type: number
 *                 example: 0
 *     responses:
 *       201:
 *         description: Cuenta creada
 */
router.post(
    '/create',
    validateJWT,
    validateAdmin,
    createAccount
);


/**
 * @swagger
 * /api/v1/accounts/listar:
 *   get:
 *     summary: Listar cuentas
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cuentas
 */
router.get(
    '/listar',
    validateJWT,
    validateAdmin,
    getAccounts
);


/**
 * @swagger
 * /api/v1/accounts/listar/{id}:
 *   get:
 *     summary: Obtener cuenta por ID
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cuenta encontrada
 */
router.get(
    '/listar/:id', 
    validateJWT, 
    validateAdmin, 
    getAccountById
);


/**
 * @swagger
 * /api/v1/accounts/{id}:
 *   put:
 *     summary: Actualizar cuenta
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cuenta actualizada
 */
router.put(
    '/:id', 
    validateJWT, 
    validateAdmin, 
    updateAccount
);


/**
 * @swagger
 * /api/v1/accounts/{id}:
 *   delete:
 *     summary: Eliminar cuenta
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cuenta eliminada
 */
router.delete(
    '/:id', 
    validateJWT, 
    validateAdmin, 
    deleteAccount
);

export default router;