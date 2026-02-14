import Transaction from './transaction.model.js';
import User from '../users/user.model.js';

// Crear una transacción
export const createTransaction = async (req, res) => {
    try {
        const {
            tipo,
            monto,
            cuentaOrigenId,
            cuentaDestinoId,
            descripcion
        } = req.body;

        // Validar que el tipo sea válido
        const tiposValidos = ['DEPOSITO', 'TRANSFERENCIA', 'COMPRA', 'CREDITO'];
        if (!tiposValidos.includes(tipo)) {
            return res.status(400).json({
                success: false,
                message: 'Tipo de transacción inválido'
            });
        }

        // Validar que la cuenta origen exista
        const cuentaOrigen = await User.findById(cuentaOrigenId);
        if (!cuentaOrigen) {
            return res.status(404).json({
                success: false,
                message: 'La cuenta origen no existe'
            });
        }

        // Crear la transacción
        const transaction = new Transaction({
            tipo,
            monto,
            cuentaOrigenId,
            cuentaDestinoId: cuentaDestinoId || null,
            descripcion
        });

        await transaction.save();

        res.status(201).json({
            success: true,
            message: 'Transacción creada exitosamente',
            data: transaction
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear la transacción',
            error: error.message
        });
    }
};

// Listar transacciones
export const getTransactions = async (req, res) => {
    try {
        const { page = 1, limit = 15 } = req.query;

        const transactions = await Transaction.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .populate('cuentaOrigenId', 'name accountNumber')
            .populate('cuentaDestinoId', 'name accountNumber');

        const total = await Transaction.countDocuments();

        res.status(200).json({
            success: true,
            data: transactions,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit
            }
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al obtener las transacciones',
            error: error.message
        });
    }
};