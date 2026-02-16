import { Router } from "express";
import { convertir } from "../divisas/divisas.controller.js";

const router = Router();

router.get(
    "/convertir", 
    convertir
);

export default router;