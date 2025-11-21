import { Schema, model, Document } from 'mongoose';

export interface CareerAd extends Document {
  carrera: string;        // "Ingeniería de Sistemas", etc.
  titulo: string;
  descripcion: string;
  horaInicio?: string;
  horaFin?: string;
  creadoPor: Schema.Types.ObjectId;
}

const CareerAdSchema = new Schema<CareerAd>(
  {
    carrera: { type: String, required: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    horaInicio: { type: String, default: null },
    horaFin: { type: String, default: null },
    creadoPor: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default model<CareerAd>('CareerAd', CareerAdSchema);
