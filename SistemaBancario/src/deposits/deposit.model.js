/*import mongoose from "mongoose";

const depositSchema = new mongoose.Schema(
    {
        cuentaId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        },

        monto: {
            type: Number,
            required: true,
            min: 0
        },

        fecha: {
            type: Date,
            default: Date.now
        },

        estado: {
            type: String,
            enum: ['ACTIVO', 'REVERTIDO'],
            default: 'ACTIVO'
        },

        modificado: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model('Deposit', depositSchema);
*/