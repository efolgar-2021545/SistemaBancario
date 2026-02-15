'use strict';

import { Router } from 'express';
import { createAccount, getAccounts } from './account.controller.js';
import { validateAdmin } from '../middlewares/validate-admin.js';

const router = Router();

router.post(
    '/create',
    validateAdmin,
    createAccount
);

router.get(
    '/listar',
    validateAdmin,
    getAccounts
);

export default router;