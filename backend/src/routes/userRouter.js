const express = require('express');
const router = express.Router();

const { deleteUserById, editUserById, getUserById} = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

router.delete('/user/:idUser', verifyToken, deleteUserById);

router.put('/user/:idUser', verifyToken, editUserById);

router.get('/user/:idUser', verifyToken, getUserById);

module.exports = router;