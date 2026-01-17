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

// Buscar libros por título, autor o descripción
const searchBooks = async (req, res) => {
  try {
    const query = req.query.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Parámetro de búsqueda vacío" });
    }

    // Búsqueda en MongoDB usando expresión regular (case-insensitive)
    const results = await bookModel.find({
      $or: [
        { titulo: { $regex: query, $options: "i" } },
        { autor: { $regex: query, $options: "i" } },
        { descripcion: { $regex: query, $options: "i" } },
        { categoria: { $regex: query, $options: "i" } },
      ],
    });

    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Error al buscar libros" });
  }
};

module.exports = {
  getAllBooks,
  searchBooks,
};
