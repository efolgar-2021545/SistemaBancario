'use strict';

import { Router } from 'express';
import {
  addFavorite,
  getMyFavorites,
  deleteFavorite
} from './favorite.controller.js';

import { validateClient } from '../middlewares/validate.client.js';

const router = Router();

// Agregar favorito
router.post('/add', validateClient, addFavorite);

// Ver mis favoritos
router.get('/listar', validateClient, getMyFavorites);

// Eliminar favorito
router.delete('/delete/:id', validateClient, deleteFavorite);

export default router;