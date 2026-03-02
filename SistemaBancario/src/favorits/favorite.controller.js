'use strict';

import Favorite from './favorite.model.js';


// AGREGAR FAVORITO (CLIENT)
export const addFavorite = async (req, res) => {
  try {
    const { alias, accountNumber } = req.body;

    if (!alias || !accountNumber) {
      return res.status(400).json({
        success: false,
        message: 'Alias y número de cuenta son obligatorios'
      });
    }

    const favorite = await Favorite.create({
      alias,
      accountNumber,
      ownerId: req.user.id 
    });

    return res.status(201).json({
      success: true,
      message: 'Favorito agregado correctamente',
      favorite
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al agregar favorito'
    });
  }
};


// VER MIS FAVORITOS (CLIENT)
export const getMyFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      ownerId: req.user.id
    });

    return res.json({
      success: true,
      favorites
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener favoritos'
    });
  }
};


// ELIMINAR FAVORITO (CLIENT)
export const deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    const favorite = await Favorite.findOne({
      _id: id,
      ownerId: req.user.id
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorito no encontrado'
      });
    }

    await favorite.deleteOne();

    return res.json({
      success: true,
      message: 'Favorito eliminado correctamente'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar favorito'
    });
  }
};