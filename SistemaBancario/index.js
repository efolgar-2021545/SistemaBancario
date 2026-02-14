import dotenv from 'dotenv';
import { initApp } from './configs/app.js';
import { dbConnection } from './configs/database.js';
import User from './src/users/user.model.js';
import { generateAccountNumber } from './src/helpers/account-number.js';

dotenv.config();

const app = initApp();
const PORT = process.env.PORT || 3000;

// Crear ADMIN automaticamente
const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: 'ADMINB' });

    if (!adminExists) {
      await User.create({
        name: 'Administrador',
        username: 'ADMINB',
        accountNumber: generateAccountNumber(),
        dpi: '0000000000000',
        direction: 'Kinal',
        phone: '00000000',
        email: 'admin@kinalbank.com',
        password: 'ADMINB',
        jobName: 'Administrador General',
        monthlyIncome: 1000,
        role: 'ADMIN',
        image: 'https://res.cloudinary.com/dadsac1uk/image/upload/v1771022530/adminBanco_y3ooaw.png'
      });

      console.log('ADMIN creado automáticamente');
    } else {
      console.log('ADMIN ya existe');
    }

  } catch (error) {
    console.error('Error creando ADMIN:', error.message);
  }
};

// Iniciar el  servidor
const startServer = async () => {
  await dbConnection();
  await createAdmin();

  app.listen(PORT, () => {
    console.log(`Kinal Bank API corriendo en puerto ${PORT}`);
  });
};

startServer();
