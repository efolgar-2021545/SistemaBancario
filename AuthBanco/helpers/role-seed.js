import { Role } from '../src/auth/role.model.js';

export const seedRoles = async () => {
  try {
    const count = await Role.count();

    if (count === 0) {
      await Role.bulkCreate([
        { Name: 'ADMIN' },
        { Name: 'CLIENT' },
      ]);

      console.log('Roles creados: ADMIN, CLIENT');
    } else {
      console.log('Roles ya existen');
    }
  } catch (error) {
    console.error('Error al crear roles:', error.message);
  }
};
