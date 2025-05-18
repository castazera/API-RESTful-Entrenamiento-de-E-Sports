import { authenticateJWT } from '../middlewares/autoMiddleware.js';
import express from 'express';
import { crearJugador, obtenerJugadores, obtenerJugadorPorId, actualizarJugador, eliminarJugador,obtenerJugadorPorNickname,obtenerJugadorPorNombre  } from '../controllers/jugadorController.js';
import { validateBody } from '../validation/validation.js';
import { jugadorSchema } from '../validation/validation.js';

const jugadoresRoutes = express.Router();

jugadoresRoutes.post('/', authenticateJWT, validateBody(jugadorSchema), crearJugador);
// GET /jugadores - Obtener todos los jugadores
jugadoresRoutes.get('/', obtenerJugadores);
// GET /jugadores/:id - Obtener un jugador por ID
jugadoresRoutes.get('/:id', obtenerJugadorPorId);
// GET /jugadores/:nickname - Obtener un jugador por nickname
jugadoresRoutes.get('/nickname/:nickname', obtenerJugadorPorNickname);
// GET /jugadores/nombre/:nombre - Obtener un jugador por nombre
jugadoresRoutes.get('/nombre/:nombre', obtenerJugadorPorNombre);
// PUT /jugadores/:id - Actualizar un jugador por ID
jugadoresRoutes.put('/:id', authenticateJWT, actualizarJugador);
// DELETE /jugadores/:id - Eliminar un jugador por ID
jugadoresRoutes.delete('/:id', authenticateJWT, eliminarJugador);



export default jugadoresRoutes;