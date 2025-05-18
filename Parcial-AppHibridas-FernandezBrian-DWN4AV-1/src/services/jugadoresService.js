import Jugador from '../models/JugadorModel.js';

export const obtenerJugadoresOrdenados = async ({ filtro = {}, page = 1, limit = 10, order = 'asc' }) => {
  const skip = (page - 1) * limit;
  const sortOrder = order === 'desc' ? -1 : 1;

  const jugadores = await Jugador.find(filtro)
    .sort({ nickname: sortOrder })
    .skip(skip)
    .limit(limit);

  const total = await Jugador.countDocuments(filtro);

  return { total, page, limit, jugadores };
};
