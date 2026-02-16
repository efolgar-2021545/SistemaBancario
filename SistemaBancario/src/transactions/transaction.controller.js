import Transaction from './transaction.model.js';
import Account from '../accounts/account.model.js';

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
            return res.status(404).json({ success: false, 
                message: 'Cuenta de origen no encontrada' 
            });
        }
        if (toAccount && !destinationAccount) {
            return res.status(404).json({ 
                success: false, 
                message: 'Cuenta de destino no encontrada' 
            });
        }

        // Validar saldo suficiente
        if (sourceAccount.balance < amountNumber) {
            return res.status(400).json({ 
                success: false, 
                message: 'Saldo insuficiente para la transferencia' 
            });
        }

        // Realizar la transferencia
        sourceAccount.balance -= amountNumber;
        if (destinationAccount) {
            destinationAccount.balance += amountNumber;
        }

        await sourceAccount.save();
        if (destinationAccount) await destinationAccount.save();

        // Guardar transacción
        const transaction = new Transaction({
            type,
            amount: amountNumber,
            fromAccount: sourceAccount._id,
            toAccount: destinationAccount ? destinationAccount._id : null,
            description,
            ownerId: req.user.id
        });

        await transaction.save();

        return res.status(201).json({
            success: true,
            message: 'Transacción realizada con exito',
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
    const transactions = await Transaction.find()
        .populate('fromAccount', 'accountNumber balance')
        .populate('toAccount', 'accountNumber');

    res.json({
        success: true,
        data: transactions
    });
};