const express = require('express');
const { signup, login, loginWithToken, updatePrincipalToken } = require('../controllers/authControllers');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)


router.post("/loginToken", verifyToken, loginWithToken);

router.post("/updatePrincipalToken", verifyToken, updatePrincipalToken);

module.exports = router;