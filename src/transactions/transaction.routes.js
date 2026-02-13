import { Router } from "express";
import { createTransaction, getTransactions } from "./transaction.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { validateAdmin } from "../middlewares/validate-admin.js";

const router = new Router();

router.post(
    '/create',
    validateJWT,
    validateAdmin,
    createTransaction
);

router.get(
    '/listar',
    validateJWT,
    validateAdmin,
    getTransactions
);

export default router;