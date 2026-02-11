'use strict';
import jwt from 'jsonwebtoken';
import User from '../users/user.model.js';

export const validateJWT = async(req,res,next)=>{
    try {
        const tokenHeader = req.header('Authorization');

        if(!token){
            return res.status(401).json({
                success: false,
                message: 'No hay un token en la petición'
            });
        }

        //Quitar la palabra Bearer
        const token = authHeader.replace('Bearer ', '');

        const verification = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(verification.uid);

        if (!user || !user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no válido'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token no válido',
            error: error.message
        });
    }
}