import { Router } from "express";
import { createUser, getUsers } from "./user.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { validateAdmin } from "../middlewares/validate-admin.js";
import { uploadUserImages } from "../middlewares/file-uploader.js";
import { cleanUploaderImage } from "../middlewares/detele-file-on-error.js";

const router = new Router();

router.post(
    '/createUsers',
    uploadUserImages.single('image'),
    cleanUploaderImage,
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