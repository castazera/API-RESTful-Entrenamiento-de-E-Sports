import Joi from 'joi';

export const jugadorSchema = Joi.object({
  nombre: Joi.string().trim().required(),
  nickname: Joi.string().trim().required(),
  edad: Joi.number().integer().min(10).max(99).required(),
  juego: Joi.string().trim().required(),
  nivel: Joi.string().valid('amateur', 'semi-pro', 'pro').required(),
  email: Joi.string().email().optional(),
  createdAt: Joi.date().optional()
});

export const entrenamientoSchema = Joi.object({
  jugador_id: Joi.string().required(),
  jugador_nickname: Joi.string().required(),
  fecha: Joi.date().optional(), 
  duracion: Joi.number().min(15).required(),
  tipo: Joi.string().valid('Individual', 'Equipo', 'Análisis', 'Práctica').required(),
  objetivo: Joi.string().required(),
  metricas: Joi.object({
    kda: Joi.number().optional(),
    winRate: Joi.number().optional(),
    tiempoReaccion: Joi.number().optional(),
    precision: Joi.number().optional()
  }).optional(),
  notas: Joi.string().optional(),
  estado: Joi.string().valid('Programado', 'En Progreso', 'Completado', 'Cancelado').optional()
});

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: 'Datos inválidos',
        detalles: error.details.map(d => d.message)
      });
    }
    next();
  };
};