'use strict';

import { Router } from 'express';
import { createAccount, getAccounts } from './account.controller.js';
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

export default router;