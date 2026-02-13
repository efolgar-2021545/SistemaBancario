'use strict';

import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
    {
        accountType: {
            type: String,
            enum: ['AHORRO', 'MONETARIA', 'CREDITO'],
            default: 'AHORRO',
            required: true
        },
        balance: {
            type: Number,
            default: 0,
            min: [0, 'El saldo no puede ser negativo']
        },
        currency: {
            type: String,
            enum: ['GTQ', 'USD', 'EUR'],
            default: 'GTQ',
            required: true
        },
        status: {
            type: String,
            enum: ['ACTIVA', 'BLOQUEADA'],
            default: 'ACTIVA',
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model('Account', accountSchema);