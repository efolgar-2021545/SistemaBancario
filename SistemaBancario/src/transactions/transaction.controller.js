import Transaction from './transaction.model.js';
import Account from '../accounts/account.model.js';
import { convertirMoneda } from "../services/divisas.service.js";


export const createTransaction = async (req, res) => {
    try {
        const { type, amount, fromAccount, toAccount, description } = req.body;

        if (!type || !amount || !fromAccount || !description) {
            return res.status(400).json({
                success: false,
                message: 'Datos incompletos para la transacción'
            });
        }

        const amountNumber = Number(amount);
        if (isNaN(amountNumber) || amountNumber <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Monto inválido'
            });
        }

        // Buscar cuentas para la transacción
        const sourceAccount = await Account.findById(fromAccount);
        const destinationAccount = toAccount ? await Account.findById(toAccount) : null;

        if (!sourceAccount) {
            return res.status(404).json({ 
                success: false, 
                message: 'Cuenta de origen no encontrada' 
            });
        }
        
        // que sea una cuenta existente
        if (toAccount && !destinationAccount) {
            return res.status(404).json({ 
                success: false, 
                message: 'Cuenta de destino no encontrada' 
            });
        }

        if (type === 'TRANSFERENCIA' && amountNumber > 2000) {
            return res.status(400).json({
                success: false,
                message: 'No puede transferir más de Q2,000 por transacción'
            });
        }

        if (type === 'TRANSFERENCIA') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const transfersToday = await Transaction.find({
                fromAccount: fromAccount,
                type: 'TRANSFERENCIA',
                createdAt: { $gte: today }
            });

            const totalTransferredToday = transfersToday.reduce((sum, t) => sum + t.amount, 0);

            if (totalTransferredToday + amountNumber > 10000) {
                return res.status(400).json({
                    success: false,
                    message: `Ha excedido el límite diario de Q10,000. Ya ha transferido Q${totalTransferredToday.toFixed(2)} hoy.`
                });
            }
        }

        if (sourceAccount.balance < amountNumber) {
            return res.status(400).json({ 
                success: false, 
                message: 'Saldo insuficiente para la transferencia' 
            });
        }

        let finalAmount = amountNumber;

        if (
            destinationAccount &&
            sourceAccount.currency !== destinationAccount.currency
        ) {
            const conversion = await convertirMoneda(
                sourceAccount.currency,
                destinationAccount.currency,
                amountNumber
            );

            finalAmount = conversion.montoConvertido;
        }

        // Realizar la transferencia
        sourceAccount.balance -= amountNumber;

        if (destinationAccount) {
            destinationAccount.balance += finalAmount;
            await destinationAccount.save();
        }

        await sourceAccount.save();

        // Guardar transacción
        const transaction = new Transaction({
            type,
            amount: finalAmount, 
            fromAccount: sourceAccount._id,
            toAccount: destinationAccount ? destinationAccount._id : null,
            description,
            ownerId: req.user.id
        });

        await transaction.save();

        return res.status(201).json({
            success: true,
            message: 'Transacción realizada con éxito',
            transaction
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al realizar la transacción',
            error: error.message
        });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('fromAccount', 'accountNumber balance')
            .populate('toAccount', 'accountNumber');

        res.json({
            success: true,
            data: transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener transacciones',
            error: error.message
        });
    }
};

// Buscar transacción por ID (ADMIN o Propietario)
export const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id)
            .populate('fromAccount')
            .populate('toAccount');

        if (!transaction) {
            return res.status(404).json({ success: false, message: 'Transacción no encontrada' });
        }

        res.status(200).json({ success: true, data: transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Actualizar transacción (ADMIN - Solo descripción)
export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id, 
            { description }, 
            { new: true }
        );

        if (!updatedTransaction) {
            return res.status(404).json({ success: false, message: 'Transacción no encontrada' });
        }

        res.status(200).json({ success: true, data: updatedTransaction });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Eliminar transacción (ADMIN)
export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByIdAndDelete(id);

        if (!transaction) {
            return res.status(404).json({ success: false, message: 'Transacción no encontrada' });
        }

        res.status(200).json({ success: true, message: 'Registro de transacción eliminado' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};