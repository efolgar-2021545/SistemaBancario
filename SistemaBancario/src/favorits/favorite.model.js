'use strict';

import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
    {
        alias: {
            type: String,
            required: true,
            trim: true
        },
        accountNumber: {
            type: String,
            required: true
        },
        ownerId: {
            type: String, // id del cliente desde JWT
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model('Favorite', favoriteSchema);