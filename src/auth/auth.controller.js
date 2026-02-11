import User from '../users/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificar si usuario exista
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Credenciales incorrectas"
            });
        }

        // validar las contrasenas
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "Credenciales incorrectas"
            });
        }

        // generar el token de jwt
        const token = jwt.sign(
            {
                uid: user._id,
                username: user.username,
                role: user.role
            },
            process.env.SECRET_KEY,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            success: true,
            message: "Login exitoso",
            token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en el login",
            error: error.message
        });
    }
};
