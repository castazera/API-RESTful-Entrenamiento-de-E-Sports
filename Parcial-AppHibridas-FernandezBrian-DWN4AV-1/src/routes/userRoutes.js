import express from "express"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { authenticateJWT } from "../middlewares/autoMiddleware.js";
import User from '../models/UserModel.js'; // Importa tu modelo

const router = express.Router()

dotenv.config()

// id,name,lastname,username,email,password
let users = []

const secretKey = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
    const { name, lastname, username, email, password } = req.body;

    if (!name || !lastname || !username || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Verifica si el usuario ya existe (por email o username)
        const UserExistente = await User.findOne({ $or: [{ email }, { username }] });
        if (UserExistente) {
            return res.status(409).json({ message: "El email o username ya está en uso" });
        }

        // Hashea la contraseña
        const hashPassword = await bcrypt.hash(password, 10);

        // Crea el usuario usando el modelo
        const newUser = new User({
            name,
            lastname,
            username,
            email,
            password: hashPassword
        });

        // Guarda en la base de datos
        const savedUser = await newUser.save();

        // No devuelvas la contraseña
        const { password: _, ...userWithoutPassword } = savedUser.toObject();

        res.status(201).json(userWithoutPassword);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca el usuario en la base de datos por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compara la contraseña hasheada
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Wrong Password" });
        }

        // Genera el token JWT
        const token = Jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            secretKey,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', authenticateJWT, async (req, res) => {
    try {
        // Trae todos los usuarios de la base de datos
        const users = await User.find({}, '-password'); // El '-password' excluye el campo password
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default router;