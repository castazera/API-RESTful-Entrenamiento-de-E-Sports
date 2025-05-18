// models/Entrenamiento.js
import mongoose, {Schema} from 'mongoose';

const entrenamientoSchema = new Schema({
  jugador_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jugador',
    required: true
  },
  jugador_nickname: {
    type: String,
    ref: 'nickname',
    required: true
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  duracion: {
    type: Number,
    required: true,
    min: 15
  },
  tipo: {
    type: String,
    required: true,
    enum: ['Individual', 'Equipo', 'Análisis', 'Práctica']
  },
  objetivo: {
    type: String,
    required: true
  },
  metricas: {
    kda: Number,     
    winRate: Number,   
    tiempoReaccion: Number, 
    precision: Number   
  },
  notas: {
    type: String,
    trim: true
  },
  estado: {
    type: String,
    enum: ['Programado', 'En Progreso', 'Completado', 'Cancelado'],
    default: 'Programado'
  }
});

entrenamientoSchema.index({ jugador_id: 1, fecha: -1 });
entrenamientoSchema.index({ tipo: 1 });
entrenamientoSchema.index({ estado: 1 });

export default mongoose.model('Entrenamiento', entrenamientoSchema);