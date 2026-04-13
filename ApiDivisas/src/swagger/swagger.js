'use strict';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Divisas',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3007'
      }
    ]
  },
  apis: ['./src/**/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};