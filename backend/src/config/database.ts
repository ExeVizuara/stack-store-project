import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configurar Sequelize con las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_DATABASE || 'stack-store', // Base de datos
  process.env.DB_USER || 'root',     // Usuario
  process.env.DB_PASSWORD || '', // Contraseña
  {
    host: process.env.DB_HOST || 'localhost', // Host
    timezone: '-03:00',
    port: Number(process.env.DB_PORT) || 3306, // Puerto
    dialect: 'mysql',                         // Motor de base de datos
    logging: console.log,                          // Desactiva logs de SQL
  }
);

// Probar la conexión
sequelize.authenticate()
  .then(() => console.log('Conexión exitosa a la base de datos MySQL'))
  .catch((err) => console.error('Error conectando a la base de datos:', err));

export default sequelize;