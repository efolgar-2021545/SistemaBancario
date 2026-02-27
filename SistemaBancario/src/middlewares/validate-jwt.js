'use strict';
import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'No hay token en la petición'
            });
        }

        const token = authHeader.replace('Bearer ', '');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Guardamos solo lo que viene en el token
        req.user = {
            id: decoded.sub,
            username: decoded.username,
            role: decoded.role
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado'
        });
    }
};
