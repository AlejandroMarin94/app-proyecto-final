const express = require("express");
const { searchBooks, getAllBooks } = require("../controllers/bookController.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", verifyToken, getAllBooks);       // Obtener todos los libros
router.get("/search", verifyToken, searchBooks);  // Buscar libros

module.exports = router;
