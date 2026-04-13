'use strict';

import { Router } from 'express';
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from './product.controller.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateAdmin } from '../middlewares/validate-admin.js';

const router = Router();


/**
 * @swagger
 * /api/v1/products/create:
 *   post:
 *     summary: Crear producto o servicio (ADMIN)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 example: SERVICIO
 *               price:
 *                 type: number
 *                 example: 25
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post('/create', validateJWT, validateAdmin, createProduct);


/**
 * @swagger
 * /api/v1/products/listar:
 *   get:
 *     summary: Obtener productos activos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/listar', getProducts);


/**
 * @swagger
 * /api/v1/products/update/{id}:
 *   put:
 *     summary: Actualizar producto (ADMIN)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.put('/update/:id', validateJWT, validateAdmin, updateProduct);


/**
 * @swagger
 * /api/v1/products/delete/{id}:
 *   delete:
 *     summary: Desactivar producto (ADMIN)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.delete('/delete/:id', validateJWT, validateAdmin, deleteProduct);

export default router;