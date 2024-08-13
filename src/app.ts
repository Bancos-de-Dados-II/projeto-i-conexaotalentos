import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import { connectToDatabase } from './config/db';
import userRouter from './routes/user';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas de usuário
app.use('/api' , userRouter);


// Conectar ao banco de dados antes de iniciar o servidor (bruno)
connectToDatabase();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});


