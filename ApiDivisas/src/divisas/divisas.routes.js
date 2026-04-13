import { Router } from "express";
import { convertir } from "../divisas/divisas.controller.js";

const router = Router();

/**
 * @swagger
 * /api/v1/divisas/convertir:
 *   get:
 *     summary: Convertir moneda
 *     tags: [Divisas]
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *         example: GTQ
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *         example: USD
 *       - in: query
 *         name: amount
 *         required: true
 *         schema:
 *           type: number
 *         example: 100
 *     responses:
 *       200:
 *         description: Conversión realizada
 */
router.get(
    "/convertir", 
    convertir
);

export default router;