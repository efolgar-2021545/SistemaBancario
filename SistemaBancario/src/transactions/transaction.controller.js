import Transaction from './transaction.model.js';
import Account from '../accounts/account.model.js';

export const createTransaction = async (req, res) => {
    try {
        const { type, amount, fromAccount, toAccount, description } = req.body;

        const account = await Account.findById(fromAccount);
        if (!account) {
            return res.status(404).json({
                success: false,
                message: 'Cuenta origen no existe'
            });
        }

        const transaction = new Transaction({
            type,
            amount,
            fromAccount,
            toAccount: toAccount || null,
            description,
            ownerId: req.user.uid // viene del JWT
        });

        await transaction.save();

        res.status(201).json({
            success: true,
            data: transaction
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
