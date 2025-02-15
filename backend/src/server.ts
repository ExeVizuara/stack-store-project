import sequelize from './config/database';
import app from './app';
import userRoutes from './routes/userRoutes';
import './models';

const PORT = process.env.PORT || 3000;
app.use('/api', userRoutes);
//sequelize.sync({ alter: true }).then(() => {
//console.log('Base de datos sincronizada correctamente');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
//});