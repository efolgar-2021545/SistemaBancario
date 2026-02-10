'use strict';

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true,
            maxlength: [50, 'El nombre no puede exceder de 100 carácteres']
        },
        username: {
            type: String,
            required: [true, 'El UserName es obligatorio'],
            unique: true,
            trim: true
        },
        accountNumber :{
            //El número de cuenta se creara aleatoriamente
            type: String,
            required: true,
            unique: true,
        },
        dpi:{
            type:String,
            required: [true, 'El DPI es obligatorio'],
            unique: true,
            minlength: [13, 'El DPI no puede tener menos de 13 dígitos'],
            maxlength: [13, 'El DPI no puede tener mas de 13 dígitos'],
            match: [/^\d{13}$/, 'El DPI solo debe contener números']
        },
        direction: {
            type: String,
            required: [true, 'La dirección es obligatoria'],
            maxlength:[200, 'La dirección no puede exceder de 200 carácteres ']
        },
        phone: {
            type: String,
            required: [true, 'El número de teléfono es obligatorio'],
            unique: true,
            minlength: [8, 'El número de teléfono no puede tener menos de 8 dígitos'],
            maxlength: [8, 'El número de teléfono no puede tener mas de 8 dígitos'],
            match: [/^\d{8}$/, 'El teléfono solo debe contener números'],
        },
        email: {
            type: String,
            required: [true, 'El correo es obligatorio'],
            unique: true,
            maxlength:[100, 'La correo no puede exceder de 100 carácteres ']
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            unique: true,
        },
        jobName: {
            type: String,
            required:[true, 'El nombre de su trabajo es obligatoria'],
        },
        monthlyIncome: {
            type: Number,
            required: true,
            min: [100, 'Debes tener mínimo Q100.00 para crear tu cuenta'],
        },
        role: {
            type: String,
            required: [true, 'El rol es obligatorio'],
            enum: ['ADMIN', 'CLIENTE'],
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model('User', userSchema);