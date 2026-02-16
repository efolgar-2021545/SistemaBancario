import { Router } from "express";
import { createDeposit, getDeposits, revertDeposit, getDepositById, updateDeposit, deleteDeposit } from "./deposit.controller.js";
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateClient } from '../middlewares/validate-client.js';
import { validateAdmin } from "../middlewares/validate-admin.js";
const router = Router();

router.post(
    '/create',
    validateJWT, 
    validateClient,
    createDeposit
);

//los depositos solo las puede ver el admin
router.get(
    '/', 
    validateJWT,
    validateAdmin,
    getDeposits
);

router.put(
    '/revert/:id',
    validateJWT, 
    validateClient,
    revertDeposit
);

router.get(
    '/:id', 
    validateJWT, 
    validateClient, 
    getDepositById
);

router.put(
    '/update/:id', 
    validateJWT, 
    validateAdmin, 
    updateDeposit
);

router.delete(
    '/:id', 
    validateJWT, 
    validateAdmin, 
    deleteDeposit
);

export default router;
