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



// Ver pendientes (admin)
router.get('/pending', validateJWT, validateAdmin, getPendingUsers);

// Aprobar
router.put('/approve', validateJWT, validateAdmin, approveUser);

//actualizar datos (admin o usuario)
router.put('/update/:userId', validateJWT,validateAdmin, updateUser);
export default router;
