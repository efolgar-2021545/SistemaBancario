import Deposit from "./deposit.model.js";
import Account from '../accounts/account.model.js';

export const createDeposit = async (req, res) => {
    try {
        const { fromAccountId, accountId, amount } = req.body;

        if (!fromAccountId || !accountId || !amount) {
        return res.status(400).json({
            success: false,
            message: 'Datos incompletos'
        });
        }

        const amountNumber = Number(amount);
        if (isNaN(amountNumber) || amountNumber <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Monto inválido'
        });
        }

        // Buscar cuenta de la persona que va a depositar
        const fromAccount = await Account.findById(fromAccountId);
        //Buscar la cuenta de la persona que recibe el deposito
        const toAccount = await Account.findById(accountId);

        if (!fromAccount) {
        return res.status(404).json({
            success: false,
            message: 'Cuenta que envía el depósito no encontrada'
        });
        }
        if (!toAccount) {
        return res.status(404).json({
            success: false,
            message: 'Cuenta que recibe el depósito no encontrada'
        });
        }

        // Validar saldo suficiente
        if (fromAccount.balance < amountNumber) {
        return res.status(400).json({
            success: false,
            message: 'Saldo insuficiente en la cuenta que envía el deposito'
        });
        }

        // Hacer la transferencia
        fromAccount.balance -= amountNumber;// se le resta a la cuenta que va a depositar
        toAccount.balance += amountNumber; // se le agrega el dinero a la cuenta que lo recibira

        await fromAccount.save();
        await toAccount.save();

        // Guardar el depósito solo para la cuenta que recibe
        const deposit = new Deposit({
        accountId: toAccount._id,
        accountNumber: toAccount.accountNumber,
        fromAccountId: fromAccount._id,
        amount: amountNumber,
        ownerId: req.user.id
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
        if (diff > 180) {
            return res.status(400).json({
                success: false,
                message: 'Solo se puede revertir antes dede 3 minutos'
            });
        }

        // Obtener cuentas involucradas
        const toAccount = await Account.findById(deposit.accountId);
        const fromAccount = await Account.findById(deposit.fromAccountId);

        if (!toAccount || !fromAccount) {
            return res.status(404).json({ 
                success: false, 
                message: 'Alguna de las cuentas no fue encontrada' 
            });
        }

        // Revertir la transferencia
        toAccount.balance -= deposit.amount;     // se resta de quien recibió
        fromAccount.balance += deposit.amount;   // se devuelve al remitente
        await toAccount.save();
        await fromAccount.save();

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
            message: 'Error al revertir el deposito',
            error: err.message
        });
    }
};
