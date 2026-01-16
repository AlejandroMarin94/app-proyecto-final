const express = require('express');
const { signup, login, loginWithToken, updatePrincipalToken } = require('../controllers/authControllers');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)


//Endpoint para login con token
router.post("/loginToken", verifyToken, loginWithToken);

//Endpoint para actualizar el token principal
router.post("/updatePrincipalToken", verifyToken, updatePrincipalToken);

module.exports = router;