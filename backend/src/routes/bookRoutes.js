const express = require("express");
const { getAllBooks } = require("../controllers/bookController.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", verifyToken, getAllBooks);       // Obtener todos los libros

module.exports = router;
