import { Router } from "express";
import { createDeposit, getDeposits, revertDeposit } from "./deposit.controller.js";
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateAdmin } from "../middlewares/validate-admin.js";
const router = Router();

router.post(
    '/create',
    validateJWT, 
    createDeposit
);

//los depositos solo las puede ver el admin
router.get(
    '/', 
    validateAdmin,
    getDeposits
);

router.put(
    '/revert/:id',
    validateJWT, 
    revertDeposit
);

export default router;
