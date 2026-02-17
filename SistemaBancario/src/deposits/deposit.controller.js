import Deposit from "./deposit.model.js";
import Account from '../accounts/account.model.js';
import { convertirMoneda } from "../services/divisas-service.js";

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

        // VALIDACIÓN: Verificar que las cuentas estén ACTIVAS
        if (fromAccount.status !== 'ACTIVA') {
            return res.status(400).json({
                success: false,
                message: 'La cuenta que envía el depósito está bloqueada'
            });
        }

        if (toAccount.status !== 'ACTIVA') {
            return res.status(400).json({
                success: false,
                message: 'La cuenta que recibe el depósito está bloqueada'
            });
        }

        // Validar saldo suficiente
        if (fromAccount.balance < amountNumber) {
            return res.status(400).json({
                success: false,
                message: 'Saldo insuficiente en la cuenta que envía el deposito'
            });
        }

        let finalAmount = amountNumber;

        if (fromAccount.currency !== toAccount.currency) {
            const conversion = await convertirMoneda(
                fromAccount.currency,
                toAccount.currency,
                amountNumber
            );

            // VALIDACIÓN: Verificar que la conversión fue exitosa
            if (!conversion || !conversion.montoConvertido) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al convertir la moneda'
                });
            }

            finalAmount = conversion.montoConvertido;
        }

        fromAccount.balance -= amountNumber;     // se le resta a la cuenta que va a depositar
        toAccount.balance += finalAmount;        // se le agrega el dinero a la cuenta que lo recibira

        await fromAccount.save();
        await toAccount.save();

        // Guardar el depósito solo para la cuenta que recibe
        const deposit = new Deposit({
            accountId: toAccount._id,
            accountNumber: toAccount.accountNumber,
            fromAccountId: fromAccount._id,
            amount: finalAmount,
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
                message: 'Solo se puede revertir antes de 3 minutos' 
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

        if (fromAccount.status !== 'ACTIVA' || toAccount.status !== 'ACTIVA') {
            return res.status(400).json({
                success: false,
                message: 'Una de las cuentas involucradas está bloqueada'
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

// Buscar depósito por ID (ADMIN)
export const getDepositById = async (req, res) => {
    try {
        const { id } = req.params;
        const deposit = await Deposit.findById(id).populate('accountId');

        if (!deposit) return res.status(404).json({ 
            success: false, 
            message: 'No encontrado' 
        });

        res.status(200).json({ 
            success: true, 
            data: deposit 
        });

    } catch (error) { 
        res.status(500).json({ 
            success: false, 
            message: error.message 
        }); 
    }
};

//  MODIFICADO: Solo permitir actualizar el monto (cantidad)
export const updateDeposit = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount } = req.body; // Solo cantidad, no estado

        if (!amount) {
            return res.status(400).json({
                success: false,
                message: 'Debe proporcionar el nuevo monto'
            });
        }

        const amountNumber = Number(amount);
        if (isNaN(amountNumber) || amountNumber <= 0) {
            return res.status(400).json({
                success: false,
                message: 'El monto debe ser un número positivo'
            });
        }

        const updated = await Deposit.findByIdAndUpdate(
            id, 
            { amount: amountNumber }, 
            { new: true }
        );

        if (!updated) return res.status(404).json({ 
            success: false, 
            message: 'No encontrado' 
        });

        res.status(200).json({ 
            success: true, 
            message: 'Monto del depósito actualizado',
            data: updated 
        });

    } catch (error) { 
        res.status(400).json({ 
            success: false, 
            message: error.message 
        }); 
    }
};


export const deleteDeposit = async (req, res) => {
    return res.status(403).json({
        success: false,
        message: 'Los depósitos no pueden ser eliminados según las políticas del sistema. Use la función de reversión si es necesario.'
    });
};