'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const BASE_PATH = '/kinalBank/v1';

//Se importaran todos los routes de las entidades
import userRoutes from '../src/users/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';


export const initApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));

  app.use(BASE_PATH, userRoutes);
  app.use(BASE_PATH, authRoutes);

  // Endpoint de prueba
  app.get(`${BASE_PATH}/health`, (req, res) => {
    res.status(200).json({
      status: 'Healthy',
      service: 'Kinal Bank API funcionando',
      timestamp: new Date().toISOString()
    });
  });

  return app;
};
