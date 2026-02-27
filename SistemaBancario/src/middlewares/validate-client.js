'use strict';

export const validateClient = (req, res, next) => {
    try {
        if (!req.user || !req.user.role) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no autenticado'
            });
        }

        if (req.user.role !== 'CLIENT') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado: solo CLIENT'
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
