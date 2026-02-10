import { Router } from "express";
import { createUser, getUsers } from "./user.controller.js";

const router = new Router();

router.post(
    '/createUsers',
    createUser
)

router.get(
    '/getUsers',
    getUsers
)

export default router;