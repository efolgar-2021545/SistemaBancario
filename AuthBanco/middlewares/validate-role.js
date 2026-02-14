'use strict';

export const validateAdmin = (req, res, next) => {
  try {
    if (!req.user || !req.role) {
      return res.status(500).json({
        success: false,
        message: 'Usuario o rol no encontrado en request',
      });
    }

    if (req.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado: solo administradores',
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error al validar rol',
    });
  }
};
