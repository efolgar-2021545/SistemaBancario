import { Router } from "express";
import { createUser, getUsers } from "./user.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { validateAdmin } from "../middlewares/validate-admin.js";

const router = new Router();

router.post(
    '/createUsers',
    validateJWT,
    validateAdmin,
    createUser
)

router.get(
    '/getUsers',
    validateJWT,
    validateAdmin,
    getUsers
)

export default router;