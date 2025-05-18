import Jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config()

const claveSecreta = process.env.JWT_SECRET

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]
        Jwt.verify(token, claveSecreta, (err, payload) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" })
            }
            req.user = payload
            next()
        })
    } else {
        return res.status(401).json({ message: "No token provided" })
    }
}