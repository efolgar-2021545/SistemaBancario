import mongoose from "mongoose";

const depositSchema = new mongoose.Schema(
    {
        accountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        },
        accountNumber: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true,
            min: 1
        },
        ownerId: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            enum: ['COMPLETADO', 'REVERTIDO'],
            default: 'COMPLETADO'
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

export default mongoose.model('Deposit', depositSchema);
