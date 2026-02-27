'use strict';

export const validateAdmin = (req, res, next) => {
    try {
        if (!req.user || !req.user.role) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no autenticado'
            });
        }

        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado: solo ADMIN'
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al validar rol',
            error: error.message
        });
    }
};