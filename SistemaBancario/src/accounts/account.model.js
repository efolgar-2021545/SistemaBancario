'use strict';

import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
    {
        accountNumber: {
            type: String,
            required: true,
            unique: true
        },
        accountType: {
            type: String,
            enum: ['AHORRO', 'MONETARIA', 'CREDITO'],
            default: 'AHORRO',
            required: true
        },
        ownerId: {
            // ✅ CAMBIO EXPLICADO:
            // ANTES: type: String → guardaba texto cualquiera como "juan123" o "abc"
            // AHORA: type: mongoose.Schema.Types.ObjectId → guarda el ID real de MongoDB
            type: mongoose.Schema.Types.ObjectId,
            
            // ref: 'User' → Le dice a Mongoose que este ID pertenece a un documento de la colección "users"
            // Esto permite:
            // 1. Validar que el ID existe en la colección users
            // 2. Hacer populate para traer los datos completos del usuario
            // 3. Mantener la relación: "esta cuenta pertenece a este usuario"
            ref: 'User',
            
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
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model('Account', accountSchema);