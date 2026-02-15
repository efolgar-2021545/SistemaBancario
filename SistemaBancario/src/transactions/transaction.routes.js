import { Router } from "express";
import { createTransaction , getTransactions} from "./transaction.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { validateAdmin } from "../middlewares/validate-admin.js";

const router = new Router();

router.post(
    '/create',
    validateJWT,
    createTransaction
);

//las transacciones solo las puede ver el admin
router.get(
    '/listar',
    validateAdmin,
    getTransactions
);

export default router;