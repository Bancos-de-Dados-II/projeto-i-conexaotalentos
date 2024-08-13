import mongoose from 'mongoose';
import 'dotenv/config';

const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASS as string;

// Função da conexão com o nosso banco
export const connectToDatabase = (): void => {
  mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@pw1.wppiw.mongodb.net/pw1?retryWrites=true&w=majority&appName=pw1`)
    .then(() => {
      console.log("Conectado ao MongoDB com sucesso, hehe!");
    })
    .catch((error: Error) => {
      console.error("Erro ao conectar com o MongoDB :-( :", error.message);
    });

  const connection = mongoose.connection;
};
