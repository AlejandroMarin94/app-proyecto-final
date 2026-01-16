const express = require('express');
const router = express.Router();

const { deleteUserById, editUserById, getUserById} = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

// Ruta para eliminar un usuario por su ID
router.delete('/user/:idUser', verifyToken, deleteUserById);

// Ruta para editar un usuario por su ID
router.put('/user/:idUser', verifyToken, editUserById);

// Ruta para obtener un usuario por su ID
router.get('/user/:idUser', verifyToken, getUserById);

module.exports = router;