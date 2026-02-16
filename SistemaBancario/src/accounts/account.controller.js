'use strict';
import {generateAccountNumber} from '../helpers/account-number.js'
import Account from './account.model.js';

// Crear cuenta (ADMIN)
export const createAccount = async (req, res) => {
    try {
        const {
            accountType,
            currency,
            balance,
            ownerId
        } = req.body;

        const account = new Account({
            accountNumber: generateAccountNumber(),
            accountType,
            currency,
            balance,
            ownerId
        });

        await account.save();

        res.status(201).json({
            success: true,
            message: 'Cuenta creada exitosamente',
            data: account
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear la cuenta',
            error: error.message
        });
    }
};

// Listar todas las cuentas (ADMIN)
export const getAccounts = async (req, res) => {
    try {
        const { page = 1, limit = 15 } = req.query;

        const accounts = await Account.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Account.countDocuments();

        res.status(200).json({
            success: true,
            data: accounts,
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
            message: 'Error al listar las cuentas',
            error: error.message
        });
    }
};

// Buscar cuenta por ID (ADMIN o Propietario)
export const getAccountById = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await Account.findById(id);

        if (!account) {
            return res.status(404).json({ success: false, message: 'Cuenta no encontrada' });
        }

        res.status(200).json({ success: true, data: account });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Actualizar cuenta (ADMIN)
export const updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // No permitimos actualizar el saldo directamente ni el número de cuenta por aquí
        delete data.balance;
        delete data.accountNumber;

        const updatedAccount = await Account.findByIdAndUpdate(id, data, { new: true });

        if (!updatedAccount) {
            return res.status(404).json({ success: false, message: 'Cuenta no encontrada' });
        }

        res.status(200).json({ success: true, message: 'Cuenta actualizada', data: updatedAccount });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Eliminar cuenta (ADMIN)
export const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await Account.findByIdAndDelete(id);

        if (!account) {
            return res.status(404).json({ success: false, message: 'Cuenta no encontrada' });
        }

        res.status(200).json({ success: true, message: 'Cuenta eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};