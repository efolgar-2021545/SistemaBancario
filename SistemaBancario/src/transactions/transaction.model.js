'use strict';

import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
{
    type: {
        type: String,
        enum: ['DEPOSITO', 'TRANSFERENCIA', 'COMPRA', 'CREDITO'],
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0.01
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
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
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