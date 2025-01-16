import express, { Application } from 'express';
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';
import saleRoutes from "./routes/saleRoutes";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes"
import { verifyToken } from './middleware/verifyToken';
import cookieParser from 'cookie-parser';

const app : Application = express();

app.use(express.json());
app.use(cookieParser());

// Rutas publicas
app.use('/api/auth', authRoutes);

app.use(verifyToken);

// Rutas protegidas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);

app.use(errorHandler);

export default app;