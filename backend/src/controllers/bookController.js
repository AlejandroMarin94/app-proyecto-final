const bookModel = require("../models/bookModel");

// Obtener todos los libros
const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.json(books);
  } catch (error) {
    console.error("Error al obtener libros:", error);
    res.status(500).json({ error: "Error al obtener libros" });
  }
};

module.exports = {
  getAllBooks,
};
