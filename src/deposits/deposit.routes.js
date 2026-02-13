import { Router } from "express";
import { createDeposit, getDeposits, revertDeposit } from "./deposit.controller.js";

const router = Router();

router.post('/create', createDeposit);

router.get('/', getDeposits);

router.put('/revert/:id', revertDeposit);

export default router;
