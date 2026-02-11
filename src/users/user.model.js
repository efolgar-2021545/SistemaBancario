'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
            required: [true, 'La contraseña es obligatoria']
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
        balance: {
            type: Number,
            default: 0
        },
        role: {
            type: String,
            enum: ['ADMIN', 'CLIENTE'],
            default: 'CLIENTE'
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

//Antes de guardar un usuario se ejecuta esta funcion
//Si la contra no fue modificada, entonces no se encripta otra vez
// Esta funcion reemplaza la contrasena original y la encripta por medio de bycrypt
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('User', userSchema);