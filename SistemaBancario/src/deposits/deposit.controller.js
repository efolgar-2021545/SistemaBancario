import Deposit from "./deposit.model.js";
import Account from '../accounts/account.model.js';

export const createDeposit = async (req, res) => {
    try {
        const { accountId, amount } = req.body;

        if (!accountId || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Datos incompletos'
            });
        }

        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({
                success: false,
                message: 'Cuenta no encontrada'
            });
        }

        // Aumentar saldo
        account.balance += amount;
        await account.save();

        const deposit = new Deposit({
            accountId: account._id,
            accountNumber: account.accountNumber,
            amount,
            ownerId: req.user.id // viene del JWT
        });

        await deposit.save();

        return res.status(201).json({
            success: true,
            message: 'Depósito realizado',
            deposit
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al realizar el depósito',
            error: err.message
        });
    }
};

export const getDeposits = async (req, res) => {
    try {
        const deposits = await Deposit.find();

        return res.status(200).send({
            success: true,
            deposits
        });

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error al obtener depósitos",
            error: err.message
        });
    }
};

export const revertDeposit = async (req, res) => {
    try {
        const { id } = req.params;

        const deposit = await Deposit.findById(id);
        if (!deposit) {
            return res.status(404).json({
                success: false,
                message: 'Depósito no encontrado'
            });
        }

        if (deposit.estado === 'REVERTIDO') {
            return res.status(400).json({
                success: false,
                message: 'Depósito ya revertido'
            });
        }

        const diff = (Date.now() - deposit.fecha) / 1000;
        if (diff > 60) {
            return res.status(400).json({
                success: false,
                message: 'Solo se puede revertir antes de 1 minuto'
            });
        }

        const account = await Account.findById(deposit.accountId);
        if (!account) {
            return res.status(404).json({
                success: false,
                message: 'Cuenta no encontrada'
            });
        }

        // Devolver dinero
        account.balance -= deposit.amount;
        await account.save();

        deposit.estado = 'REVERTIDO';
        await deposit.save();

        return res.json({
            success: true,
            message: 'Depósito revertido',
            deposit
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};
