'use strict';
import {generateAccountNumber} from '../helpers/account-number.js'
import Account from './account.model.js';

// Crear cuenta (ADMIN)
export const createAccount = async (req, res) => {
    try {
        const {
            accountType,
            currency,
            ownerId
        } = req.body;

        const account = new Account({
            accountNumber: generateAccountNumber(),
            accountType,
            currency,
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