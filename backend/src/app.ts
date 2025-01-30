import express, { Application } from 'express';
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';
import saleRoutes from "./routes/saleRoutes";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes"
import { verifyToken } from './middleware/verifyToken';
import cookieParser from 'cookie-parser';
import cors from "cors";
const app : Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', // Dirección del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Si necesitas enviar cookies
}));

// Rutas publicas
app.use('/api/auth', authRoutes);

app.use(verifyToken);

// Rutas protegidas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);

app.use(errorHandler);

export default app;