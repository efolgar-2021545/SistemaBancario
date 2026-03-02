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

// Agregar favorito
router.post('/create', validateJWT, validateClient, addFavorite);

// Ver mis favoritos
router.get('/listar', validateJWT, validateClient, getMyFavorites);

// Eliminar favorito
router.delete('/delete/:id', validateJWT, validateClient, deleteFavorite);

export default router;