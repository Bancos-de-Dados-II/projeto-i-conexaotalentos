//modela a entidade 
import { Schema, model, Document } from 'mongoose';

interface IVaga extends Document {
  titulo: string;
  descricao: string;
  localizacao: {
    type: string;
    coordinates: [number, number];
  };
  empresa: string;
  salario: number;
}

const vagaSchema = new Schema<IVaga>({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  localizacao: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  empresa: { type: String, required: true },
  salario: { type: Number, required: true },
});

const Vaga = model<IVaga>('Vaga', vagaSchema);

export default Vaga;
