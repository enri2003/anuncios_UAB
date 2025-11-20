import { Schema, model, Document } from 'mongoose';

export interface IAd extends Document {
  titulo: string;
  descripcion: string;
  categoria: string;
  precio?: number;
  creadoPor: string; // id del usuario
  creadoEn: Date;
}

const adSchema = new Schema<IAd>(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    categoria: { type: String, required: true },
    precio: { type: Number },
    creadoPor: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'creadoEn', updatedAt: false }
  }
);

export const Ad = model<IAd>('Ad', adSchema);
