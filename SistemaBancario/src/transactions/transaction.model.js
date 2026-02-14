'use strict';

import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        tipo: {
            type: String,
            enum: ['DEPOSITO', 'TRANSFERENCIA', 'COMPRA', 'CREDITO'],
            required: [true, 'El tipo de transacción es obligatorio']
        },
        monto: {
            type: Number,
            required: [true, 'El monto es obligatorio'],
            min: [0.01, 'El monto debe ser mayor a 0']
        },
        cuentaOrigenId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'La cuenta origen es obligatoria']
        },
        cuentaDestinoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        descripcion: {
            type: String,
            required: [true, 'La descripción es obligatoria'],
            trim: true,
            maxlength: [200, 'La descripción no puede exceder de 200 caracteres']
        },
        fecha: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model('Transaction', transactionSchema);