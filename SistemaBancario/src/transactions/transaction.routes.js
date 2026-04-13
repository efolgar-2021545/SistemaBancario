import { Router } from "express";
import { createTransaction , getTransactions, getTransactionById, updateTransaction, deleteTransaction} from "./transaction.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { validateClient } from "../middlewares/validate-client.js";
import { validateAdmin } from "../middlewares/validate-admin.js";

const router = new Router();


/**
 * @swagger
 * /api/v1/transactions/create:
 *   post:
 *     summary: Crear transferencia o transacción
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: TRANSFERENCIA
 *               amount:
 *                 type: number
 *                 example: 500
 *               fromAccount:
 *                 type: string
 *               toAccount:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transacción creada
 */
router.post(
    '/create',
    validateJWT,
    validateClient,
    createTransaction
);


/**
 * @swagger
 * /api/v1/transactions/listar:
 *   get:
 *     summary: Listar transacciones (ADMIN)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 */
router.get(
    '/listar',
    validateJWT,
    validateAdmin,
    getTransactions
);


/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   get:
 *     summary: Obtener transacción por ID
 *     tags: [Transactions]
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
    getTransactionById
);


/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   put:
 *     summary: Actualizar descripción de transacción (5 min)
 *     tags: [Transactions]
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
    '/:id', 
    validateJWT, 
    validateClient, 
    updateTransaction
);


/**
 * @swagger
 * /api/v1/transactions/{id}:
 *   delete:
 *     summary: Eliminar transacción
 *     tags: [Transactions]
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
    validateClient, 
    deleteTransaction
);

export default router;