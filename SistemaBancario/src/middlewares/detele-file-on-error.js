import { cloudinary } from "./file-uploader.js";

export const cleanUploaderImage = (req, res, next) => {
    if(req.file) {
        res.on('finish', async () => {
            try {
                if(res.statusCode >= 400) {
                    const publicId = req.file.public_id || req.file.filename;
                    if(publicId){
                        await cloudinary.uploader.destroy(publicId);
                        console.log(
                            `Imagen de Cloudinary eliminado por respuesta ${res.statusCode}: ${publicId}`
                        )
                    }
                }
            } catch (error) {
                console.error(`Error al eliminar Imagen de cloudinary tras error de respuest: ${e.message}`)
            }
        })
    }

    next();
}

export const deleteImage = async (err, req, res, next) => {
    try {
        if(req.file) {
            const publicId = req.file.public_id || req.file.filename;
            if(publicId){
                await cloudinary.uploader.destroy(publicId);
                console.log(
                    `Imagen de Cloudinary eliminado por error en cadena: ${publicId}`
                )
            }
        }
    } catch (error) {
        console.error(`Error al eliminar Imagen de Cloudinary (error handler): ${error.message}`)
    }
    return next(err);
}