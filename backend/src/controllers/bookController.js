const { API_KEY } = require("../config/apikey");
const searchBooks = async (req, res) => {
  try {
    const query = req.query.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Missing search query" });
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query
    )}&langRestrict=es&printType=books&maxResults=40&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) {
      return res.json([]);
    }

    // Crear un mapa para evitar duplicados por título
    const uniqueBooks = new Map();

    const results = data.items
      .map(item => {
        const info = item.volumeInfo;

        return {
          id: item.id,
          title: info.title || "Título desconocido",
          author: info.authors?.[0] || "Autor desconocido",
          publishedDate: info.publishedDate || "Fecha desconocida",
          description: info.description || "",
          categories: info.categories || [],
          cover:
            info.imageLinks?.thumbnail ||
            info.imageLinks?.smallThumbnail ||
            null,
        };
      })
      .filter(book => {
        // Filtrar duplicados: si ya existe un libro con el mismo título, no lo añadimos
        if (uniqueBooks.has(book.title)) {
          return false;
        }
        uniqueBooks.set(book.title, true);
        return true;
      });

    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Error searching books" });
  }
};

module.exports = {
  searchBooks,
};
