import { Router } from "express";
import { createTransaction , getTransactions, getTransactionById, updateTransaction, deleteTransaction} from "./transaction.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { validateClient } from "../middlewares/validate-client.js";
import { validateAdmin } from "../middlewares/validate-admin.js";

const router = new Router();

router.post(
    '/create',
    validateJWT,
    validateClient,
    createTransaction
);

//las transacciones solo las puede ver el admin
router.get(
    '/listar',
    validateJWT,
    validateAdmin,
    getTransactions
);

router.get(
    '/:id', 
    validateJWT, 
    validateClient, 
    getTransactionById
);

router.put(
    '/:id', 
    validateJWT, 
    validateAdmin, 
    updateTransaction
);

router.delete(
    '/:id', 
    validateJWT, 
    validateAdmin, 
    deleteTransaction
);

export default router;