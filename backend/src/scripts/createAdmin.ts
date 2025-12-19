import sequelize from '../config/database';
import User from '../models/User';
import { encryptPassword } from '../models/User';

async function createAdmin() {
  await sequelize.authenticate();

  const email = 'admin@admin.com';
  const password = 'admin123';

  const exists = await User.findOne({ where: { email } });
  if (exists) {
    console.log('❌ Admin ya existe');
    process.exit(0);
  }

  const hash = await encryptPassword(password);

  await User.create({
    name: 'Admin',
    email,
    password_hash: hash,
    role: 'admin',
  });

  console.log('✅ Admin creado');
  console.log('📧 Email:', email);
  console.log('🔑 Password:', password);

  process.exit(0);
}

createAdmin();
