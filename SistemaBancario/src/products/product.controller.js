'use strict';

import Product from './product.model.js';

// CREAR PRODUCTO / SERVICIO (ADMIN)
export const createProduct = async (req, res) => {
  try {
    const { name, description, type } = req.body;

    if (!name || !description || !type) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    const product = await Product.create({
      name,
      description,
      type,
      createdBy: req.user
    });

    return res.status(201).json({
      success: true,
      message: 'Producto creado correctamente',
      product
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear producto'
    });
  }
};


// OBTENER TODOS (PUBLICO o ADMIN)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: true });

    return res.json({
      success: true,
      products
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener productos'
    });
  }
};


// ACTUALIZAR (ADMIN)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    await product.updateOne(req.body);

    return res.json({
      success: true,
      message: 'Producto actualizado correctamente'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar producto'
    });
  }
};


// ELIMINAR (DESACTIVAR) (ADMIN)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    product.status = false;
    await product.save();

    return res.json({
      success: true,
      message: 'Producto desactivado correctamente'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar producto'
    });
  }
};