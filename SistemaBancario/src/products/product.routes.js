'use strict';

import { Router } from 'express';
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from './product.controller.js';

import { validateAdmin } from '../middlewares/validate.admin.js';

const router = Router();

// Crear producto (solo ADMIN)
router.post('/create', validateAdmin, createProduct);

// Ver productos (puede ser público)
router.get('/listar', getProducts);

// Actualizar producto (solo ADMIN)
router.put('/update/:id', validateAdmin, updateProduct);

// Eliminar (desactivar) producto (solo ADMIN)
router.delete('/delete/:id', validateAdmin, deleteProduct);

export default router;