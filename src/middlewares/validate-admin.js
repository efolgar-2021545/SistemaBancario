'use strict';

export const validateAdmin =(req,res,next)=>{
    try {
        const user = req.user;

        if(!user){
            res.status(500).json({
                success: false,
                message: 'No se pudo validar el usuario'
            });
        }

        if(user.role !=='ADMIN'){
            res.status(403).json({
                success: false,
                message: 'Acceso denegado, solo se permite el rol de ADMIN'
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al validar el rol',
            error: error.message
        })
    }
}