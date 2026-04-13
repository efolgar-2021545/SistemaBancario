'use strict';

import { Router } from 'express';
import {
  addFavorite,
  getMyFavorites,
  deleteFavorite
} from './favorite.controller.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateClient } from '../middlewares/validate-client.js';

const router = Router();


/**
 * @swagger
 * /api/v1/favorites/create:
 *   post:
 *     summary: Agregar cuenta favorita
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alias:
 *                 type: string
 *                 example: Mi mamá
 *               accountNumber:
 *                 type: string
 *                 example: ACC-123456
 *     responses:
 *       201:
 *         description: Favorito agregado
 */
router.post('/create', validateJWT, validateClient, addFavorite);


/**
 * @swagger
 * /api/v1/favorites/listar:
 *   get:
 *     summary: Obtener mis favoritos
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de favoritos
 */
router.get('/listar', validateJWT, validateClient, getMyFavorites);


/**
 * @swagger
 * /api/v1/favorites/delete/{id}:
 *   delete:
 *     summary: Eliminar favorito
 *     tags: [Favorites]
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
 *         description: Favorito eliminado
 */
router.delete('/delete/:id', validateJWT, validateClient, deleteFavorite);

export default router;