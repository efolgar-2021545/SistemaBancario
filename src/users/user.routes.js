import { Router } from "express";
import { createUser, getUsers , updateUser, getById,deleteUser} from "./user.controller.js";
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

router.get(
    '/getUser/:id',
    validateJWT,
    validateAdmin,
    getById
);

router.put(
    '/updateUser/:id',
    uploadUserImages.single('image'),
    cleanUploaderImage,
    validateJWT,
    validateAdmin,
    updateUser
);

router.delete(
    '/deleteUser/:id',
    validateJWT,
    validateAdmin,
    deleteUser
)

export default router;