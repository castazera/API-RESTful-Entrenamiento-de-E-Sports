import { authenticateJWT } from '../middlewares/autoMiddleware.js';
import express from 'express';
import { validateBody } from '../validation/validation.js';
import { entrenamientoSchema } from '../validation/validation.js';
import {crearEntrenamiento, obtenerEntrenamientos, obtenerEntrenamientoPorId, actualizarEntrenamiento, eliminarEntrenamiento,obtenerEntrenamientosPorTipo,obtenerEntrenamientosPorJugador} from '../controllers/entrenamientoController.js';

const entrenamientosRoutes = express.Router();  

entrenamientosRoutes.post('/', authenticateJWT, validateBody(entrenamientoSchema), crearEntrenamiento);
// GET /entrenamientos - Obtener todos los entrenamientos
entrenamientosRoutes.get('/', obtenerEntrenamientos);
// GET /entrenamientos/:id - Obtener un entrenamiento por ID
entrenamientosRoutes.get('/:id', obtenerEntrenamientoPorId);
//GET /entrenamientos/tipo/:tipo - Obtener entrenamientos por tipo
entrenamientosRoutes.get('/tipo/:tipo', obtenerEntrenamientosPorTipo);
//GET /entrenamientos/jugador/:nickname - Obtener entrenamientos por jugador
entrenamientosRoutes.get('/jugador/:nickname', obtenerEntrenamientosPorJugador);
// PUT /entrenamientos/:id - Actualizar un entrenamiento por ID
entrenamientosRoutes.put('/:id', authenticateJWT, actualizarEntrenamiento);
// DELETE /entrenamientos/:id - Eliminar un entrenamiento por ID
entrenamientosRoutes.delete('/:id', authenticateJWT, eliminarEntrenamiento);

export default entrenamientosRoutes;