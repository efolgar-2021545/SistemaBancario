'use strict';

import { Router } from 'express';
import { createAccount, getAccounts, getAccountById, updateAccount, deleteAccount } from './account.controller.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateAdmin } from '../middlewares/validate-admin.js';

const router = Router();

router.post(
    '/create',
    validateJWT,
    validateAdmin,
    createAccount
);

router.get(
    '/listar',
    validateJWT,
    validateAdmin,
    getAccounts
);

router.get(
    '/listar/:id', 
    validateJWT, 
    validateAdmin, 
    getAccountById
);

router.put(
    '/:id', 
    validateJWT, 
    validateAdmin, 
    updateAccount
);

router.delete(
    '/:id', 
    validateJWT, 
    validateAdmin, 
    deleteAccount
);

export default router;