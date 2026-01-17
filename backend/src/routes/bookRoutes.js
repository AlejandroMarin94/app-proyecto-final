const express = require("express");
const { searchBooks, getAllBooks } = require("../controllers/bookController.js");

const router = express.Router();

router.get("/", getAllBooks);       // Obtener todos los libros
router.get("/search", searchBooks);  // Buscar libros

module.exports = router;
