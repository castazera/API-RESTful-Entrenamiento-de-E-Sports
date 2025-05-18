import Jugador from '../models/JugadorModel.js'; 
import { obtenerJugadoresOrdenados } from '../services/jugadoresService.js';

export const crearJugador = async (req, res) => {
  try{
    const jugador = new Jugador({...req.body});
    const nuevoJugador = await jugador.save();
    res.status(201).json(nuevoJugador);
  }catch(err){
    res.status(400).json({error: err.message});
  }
};

export const obtenerJugadores = async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const order = req.query.order || 'asc';

      const filtro = {};
      if (req.query.nombre) filtro.nombre = req.query.nombre;
      if (req.query.nickname) filtro.nickname = req.query.nickname;

      const resultado = await obtenerJugadoresOrdenados({ filtro, page, limit, order });

      res.json(resultado);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

export const obtenerJugadorPorNickname = async (req,res)=> {
    try {
        const jugador = await Jugador.findOne({nickname: req.params.nickname}); 
        if (!jugador) {
            return res.status(404).json({mensaje: 'Jugador no encontrado'});
          }
        res.json(jugador);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

export const obtenerJugadorPorNombre = async (req,res)=> {
    try {
        const jugadores = await Jugador.find({nombre: req.params.nombre});
        if (jugadores.length === 0) {
            return res.status(404).json({mensaje: 'No hay ningun Jugador que se llame asi'});
          }
        res.json(jugadores);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}
export const obtenerJugadorPorId = async (req,res)=> {
    try {
        const jugador = await Jugador.findById(req.params.id);
        if (!jugador) {
          return res.status(404).json({ mensaje: 'Jugador no encontrado' });
        }
        res.json(jugador);
      } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el jugador', error: error.message });
      }
}

export const actualizarJugador = async (req,res)=> {
    try{
        const jugador = await Jugador.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!jugador){
            return res.status(404).json({mensaje: 'Jugador no encontrado'});
        }
        res.json(jugador);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

export const eliminarJugador = async (req,res)=> {
    try{
        const jugador = await Jugador.findByIdAndDelete(req.params.id);
        if(!jugador){
            return res.status(404).json({mensaje: 'Jugador no encontrado'});
        }
        res.json({mensaje: 'Jugador eliminado'});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}
