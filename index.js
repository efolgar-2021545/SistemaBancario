import dotenv from 'dotenv';
import { initApp } from './configs/app.js';
import { dbConnection } from './configs/database.js';

dotenv.config();

const app = initApp();

const PORT = process.env.PORT || 3000;

dbConnection();

app.listen(PORT, () => {
  console.log(`Kinal Bank API corriendo en puerto ${PORT}`);
});
