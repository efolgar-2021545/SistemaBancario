'use strict';
console.log('User routes loaded');
import { Router } from 'express';
import {
  getPendingUsers,
  approveUser,
} from './user.controller.js';

import { validateJWT } from '../../middlewares/validate-JWT.js';
import { validateAdmin } from '../../middlewares/validate-role.js';

const router = Router();



// Ver pendientes (admin)
router.get('/pending', validateJWT, validateAdmin, getPendingUsers);

// Aprobar
router.put('/approve', validateJWT, validateAdmin, approveUser);

export default router;
