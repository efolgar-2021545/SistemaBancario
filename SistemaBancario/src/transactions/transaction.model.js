'use strict';

import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
{
    type: {
        type: String,
        enum: ['DEPOSITO', 'TRANSFERENCIA', 'COMPRA', 'CREDITO'],
        required: true
    },
    // Monto enviado
    amountSent: {
        type: Number,
        required: true,
        min: 0.01
    },

    // Monto recibido
    amountReceived: {
        type: Number,
        required: true,
        min: 0.01
    },

    // Moneda origen
    currencyFrom: {
        type: String,
        required: true
    },

    // Moneda destino
    currencyTo: {
        type: String,
        required: true
    },

    // Esta es la tasa
    exchangeRate: {
        type: Number,
        default: 1
    },
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        default: null
    },
    ownerId: {
        type: String, // viene del JWT
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Transaction', transactionSchema);
