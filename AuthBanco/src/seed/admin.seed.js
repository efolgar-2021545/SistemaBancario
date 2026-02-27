import argon2 from 'argon2';
import { User } from '../users/user.model.js';

export const createAdmin = async () => {
  const admin = await User.findOne({
    where: { role: 'ADMIN' },
  });

  if (admin) return;

  const hash = await argon2.hash('admin123');

  await User.create({
    name: 'Admin',
    username: 'admin',
    email: 'admin@bank.com',
    password: hash,
    role: 'ADMIN',
    active: true,
  });

  console.log('Admin created');
};
