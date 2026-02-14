import argon2 from 'argon2';
import { User } from '../src/users/user.model.js';
import { Role } from '../src/auth/role.model.js';
import { generateUserId } from './uuid.generator.js';

export const seedAdmin = async () => {
  try {
    // Buscar rol ADMIN
    const adminRole = await Role.findOne({
      where: { Name: 'ADMIN' },
    });

    if (!adminRole) {
      console.log('Rol ADMIN no existe aún');
      return;
    }

    // Ver si ya hay admin
    const exists = await User.findOne({
      where: { RoleId: adminRole.Id },
    });

    if (exists) {
      console.log('Admin ya existe');
      return;
    }

    // Crear admin
    const passwordHash = await argon2.hash('ADMINB');

    await User.create({
      Id: generateUserId(),
      Name: 'Administrador',
      Username: 'ADMINB',
      Email: 'admin@bank.com',
      Password: passwordHash,
      DPI: '0000000000000',
      Address: 'Central',
      Phone: '00000000',
      Job: 'System Admin',
      MonthlyIncome: 10000,
      AccountNumber: 'ADMIN-0001',
      RoleId: adminRole.Id,
      Status: true, // ACTIVO
    });

    console.log('Admin creado: admin@bank.com / ADMINB');
  } catch (error) {
    console.error('Error creando admin:', error.message);
  }
};
