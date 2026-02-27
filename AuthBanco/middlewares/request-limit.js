// Middleware temporal sin límite (desactivado)

export const requestLimit = (req, res, next) => {
  next();
};

export const authRateLimit = (req, res, next) => {
  next();
};
