import { Router } from "express";
import { createDeposit, getDeposits, revertDeposit, getDepositById, updateDeposit, deleteDeposit } from "./deposit.controller.js";
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateClient } from '../middlewares/validate-client.js';
import { validateAdmin } from "../middlewares/validate-admin.js";

const router = Router();


/**
 * @swagger
 * /api/v1/deposits/create:
 *   post:
 *     summary: Crear depósito
 *     tags: [Deposits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: string
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *                 example: GTQ
 *     responses:
 *       201:
 *         description: Depósito realizado
 */
router.post(
    '/create',
    validateJWT, 
    validateClient,
    createDeposit
);


/**
 * @swagger
 * /api/v1/deposits:
 *   get:
 *     summary: Listar depósitos (ADMIN)
 *     tags: [Deposits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de depósitos
 */
router.get(
    '/', 
    validateJWT,
    validateAdmin,
    getDeposits
);


/**
 * @swagger
 * /api/v1/deposits/revert/{id}:
 *   put:
 *     summary: Revertir depósito (3 minutos)
 *     tags: [Deposits]
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
 *         description: Depósito revertido
 */
router.put(
    '/revert/:id',
    validateJWT, 
    validateClient,
    revertDeposit
);


/**
 * @swagger
 * /api/v1/deposits/{id}:
 *   get:
 *     summary: Obtener depósito por ID
 *     tags: [Deposits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get(
    '/:id', 
    validateJWT, 
    validateClient, 
    getDepositById
);


/**
 * @swagger
 * /api/v1/deposits/update/{id}:
 *   put:
 *     summary: Actualizar depósito (ADMIN)
 *     tags: [Deposits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.put(
    '/update/:id', 
    validateJWT, 
    validateAdmin, 
    updateDeposit
);


/**
 * @swagger
 * /api/v1/deposits/{id}:
 *   delete:
 *     summary: Eliminar depósito (ADMIN)
 *     tags: [Deposits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.delete(
    '/:id', 
    validateJWT, 
    validateAdmin, 
    deleteDeposit
);

export default router;