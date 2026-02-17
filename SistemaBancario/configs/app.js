'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const BASE_PATH = '/kinalBank/v1';

//Se importaran todos los routes de las entidades
import transactionRoutes from '../src/transactions/transaction.routes.js';
import accountRoutes from '../src/accounts/account.routes.js';
import depositRoutes from '../src/deposits/deposit.routes.js';


export const initApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));

  app.use(`${BASE_PATH}/transactions`, transactionRoutes);
  app.use(`${BASE_PATH}/accounts`, accountRoutes);
  app.use(`${BASE_PATH}/deposits`, depositRoutes);

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
