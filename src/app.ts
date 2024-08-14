import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import { connectToDatabase } from './config/db';
import userRouter from './routes/user';
import jobRouter from './routes/job';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rota de usuário
app.use('/api' , userRouter);
// Rota de job
app.use('/api' , jobRouter);


// Conectar ao banco de dados antes de iniciar o servidor (bruno)
connectToDatabase();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});


