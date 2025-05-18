import Entrenamiento from '../models/EntrenamientoModel.js';
import Jugador from '../models/JugadorModel.js';
import { obtenerEntrenamientosOrdenadosPorTipo } from '../services/entrenamientoService.js';

export const crearEntrenamiento = async (req,res)=> {
    try {
        const datos = {...req.body};
        if(!datos.fecha){
            datos.fecha = new Date();
        }

        const entrenamiento = new Entrenamiento(datos);
        const nuevoEntrenamiento = await entrenamiento.save();

        const entrenamientoFormateado = {
            ...nuevoEntrenamiento.toObject(),
            fecha: nuevoEntrenamiento.fecha.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        };

        res.status(201).json(entrenamientoFormateado);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

export const obtenerEntrenamientos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const order = req.query.order || 'asc';


        const resultado = await obtenerEntrenamientosOrdenadosPorTipo({ page, limit, order });

        res.json(resultado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const obtenerEntrenamientoPorId = async (req,res)=> {
    try {
        const entrenamiento = await Entrenamiento.findById(req.params.id);
        if(!entrenamiento){
            return res.status(404).json({error: 'Entrenamiento no encontrado'});
        }
        res.json(entrenamiento);
    }catch(err){
        res.status(500).json({error: err.message}); 
    }
}

export const obtenerEntrenamientosPorJugador = async (req,res)=> {
    try { 
        const jugador = await Jugador.findOne({nickname: req.params.nickname});
        if(!jugador){
            return res.status(404).json({error: 'Jugador no encontrado'});
        }
        const entrenamientos = await Entrenamiento.find({jugador_id: jugador._id});
        res.json(entrenamientos);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

export const obtenerEntrenamientosPorTipo = async (req,res)=> {
    try {
        const entrenamientos = await Entrenamiento.find({tipo: req.params.tipo});   
        if(entrenamientos.length === 0){
            return res.status(404).json({error: 'No se encontraron entrenamientos de este tipo'});
        }
        res.json(entrenamientos);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

export const actualizarEntrenamiento = async (req,res)=> {
    try {
        const entrenamiento = await Entrenamiento.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!entrenamiento){
            return res.status(404).json({error: 'Entrenamiento no encontrado'});
        }
        res.json(entrenamiento);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

export const eliminarEntrenamiento = async (req,res)=> {
    try {
        const entrenamiento = await Entrenamiento.findByIdAndDelete(req.params.id);
        if(!entrenamiento){
            return res.status(404).json({error: 'Entrenamiento no encontrado'});
        }
        res.json({message: 'Entrenamiento eliminado'});
    }catch(err){
        res.status(500).json({error: err.message}); 
    }
}
