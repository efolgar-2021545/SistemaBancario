import { corsOptions } from '../../configs/cors-configuration.js';
import { generateAccountNumber } from '../../src/helpers/account-number.js'
import User from './user.model.js';

//Crear Usuario(ADMIN)
export const createUser = async (req, res) => {
    try {
        const userData = req.body;

        // Imagen que el admin manda
        if (req.file) {
            userData.image = req.file.path;
        }

        userData.accountNumber = generateAccountNumber();
        userData.role = 'CLIENTE';

        const user = new User(userData);
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: user
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
};


//Ver Usuarios(ADMIN)
export const getUsers = async(req,res)=>{
    try {
        const {page = 1, limit=15, isActive=true} = req.query;

        const filter = { isActive: true };//asi aparecen solo los usuarios activos
        const users = await User.find(filter)
            .limit(limit *1)
            .skip((page-1) * limit)
            .sort({ createdAt: -1 });

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
        res.status(500).json({
            success: false,
            message: 'Error al listar los Usuarios',
            error: error.message
        });
    }
}

//Obtener usuario por ID
export const getById = async(req,res)=>{
    try {
        const{id}= req.params;

        const user = await User.findById(id); 

        if(!user){
            return res.status(404).json({
                success:false,
                message: 'Usuario no encontrado',
            })
        }

        res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al buscar usuario por Id',
            error: error.message
        });
    }
}

// Actualizar un usuario por ID
export const updateUser = async(req,res)=>{
    try {
        const{id}= req.params;

        const currentUser = await User.findById(id);
        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
            });
        }

        const updateData = { ...req.body };

        if (req.file) {
            if (currentUser.image_public_id) {
                await cloudinary.uploader.destroy(currentUser.image_public_id);
            }

            updateData.image = req.file.path;
            updateData.image_public_id = req.file.filename;
        }

        const updateUsers = await User.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: "Usuario actualizado exitosamente",
            data: updateUsers,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar Usuario",
            error: error.message,
        });
    }
} 

// Eliminar Usuario por ID
export const deleteUser = async(req,res)=>{
    try {
        const{id} =req.params;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        //se desactiva el usuario
        user.isActive = false;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Usuario eliminado correctamente',
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar usuario',
            error: error.message
        })
    }
}