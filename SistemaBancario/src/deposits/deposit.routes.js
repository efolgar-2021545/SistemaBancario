import { Router } from "express";
import { createDeposit, getDeposits, revertDeposit } from "./deposit.controller.js";
import { validateJWT } from '../middlewares/validate-jwt.js';
const router = Router();

router.post(
    '/create',
    validateJWT, 
    createDeposit
);

router.get(
    '/', 
    validateJWT,
    getDeposits
);

router.put(
    '/revert/:id',
    validateJWT, 
    revertDeposit
);

export default router;
