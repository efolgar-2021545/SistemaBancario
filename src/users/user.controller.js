import { corsOptions } from '../../configs/cors-configuration.js';
import { generateAccountNumber } from '../../src/helpers/account-number.js'
import User from './user.model.js';

//Crear Usuario(ADMIN)
export const createUser = async(req, res)=>{
    try {
        const userData = req.body;

        userData.accountNumber = generateAccountNumber();
        
        const user = new User(userData);
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data:user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
}

//Ver Usuarios(ADMIN)
export const getUsers = async(req,res)=>{
    try {
        const {page = 1, limit=15, isActive=true} = req.query;

        const filter = {isActive};
        const users = await User.find(filter)
            .limit(limit *1)
            .skip((page-1) * limit)
            .sort(corsOptions.sort);

        const total = await User.countDocuments(filter);

        res.status(200).json({
                success: true,
                data:users,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total/limit),
                    totalRecords: total,
                    limit
                }
            }
        )
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al listar los Usuarios',
            error: error.message
        });
    }
}