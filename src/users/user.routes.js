import { Router } from "express";
import { createUser, getUsers } from "./user.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = new Router();

router.post(
    '/createUsers',
    validateJWT,
    createUser
)

router.get(
    '/getUsers',
    validateJWT,
    getUsers
)

export default router;