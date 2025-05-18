import User from '../models/UserModel.js';

// Ejemplo en un controlador:
export const crearUsuario = async (req, res) => {
  try {
    const user = new User(req.body);
    const nuevoUsuario = await user.save();
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
