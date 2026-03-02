'use strict';

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['PRODUCTO', 'SERVICIO'],
            required: true
        },
        status: {
            type: Boolean,
            default: true
        },
        createdBy: {
            type: String, 
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model('Product', productSchema);