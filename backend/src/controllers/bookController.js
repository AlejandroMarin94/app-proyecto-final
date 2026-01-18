const bookModel = require("../models/bookModel");
const userModel = require("../models/userModel");

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

// Obtener biblioteca del usuario
const getUserLibraries = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({ status: 'Error', message: 'Usuario no encontrado' });
    }

    res.json({
      status: 'Success',
      userBooks: user.userBooks || { pendiente: [], leyendo: [], leido: [] },
      favoriteBooks: user.favoriteBooks || {}
    });
  } catch (error) {
    console.error("Error al obtener biblioteca:", error);
    res.status(500).json({ status: 'Error', error: "Error al obtener biblioteca" });
  }
};

// Agregar libro a biblioteca del usuario
const addBookToUserLibrary = async (req, res) => {
  try {
    const { userId } = req.params;
    const { book, status } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 'Error', message: 'Usuario no encontrado' });
    }

    const statusMap = {
      'Pendiente': 'pendiente',
      'Leyendo': 'leyendo',
      'Leído': 'leido'
    };

    const dbStatus = statusMap[status] || status.toLowerCase();

    if (!user.userBooks[dbStatus]) {
      user.userBooks[dbStatus] = [];
    }

    // Evitar duplicados usando _id de MongoDB como identificador principal
    const bookIdStr = book._id ? String(book._id) : (book.id || book.titulo);
    const bookExists = user.userBooks[dbStatus].some(b => {
      const bIdStr = b._id ? String(b._id) : (b.id || b.titulo);
      return bIdStr === bookIdStr;
    });

    if (!bookExists) {
      user.userBooks[dbStatus].push(book);
      await user.save();
    }

    res.json({
      status: 'Success',
      userBooks: user.userBooks,
      favoriteBooks: user.favoriteBooks || {}
    });
  } catch (error) {
    console.error("Error al agregar libro:", error);
    res.status(500).json({ status: 'Error', error: "Error al agregar libro" });
  }
};

// Actualizar estado o favorito de un libro
const updateBookStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { book, newStatus, isFavorite } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 'Error', message: 'Usuario no encontrado' });
    }

    // Usar TÍTULO como clave consistentemente
    const bookId = book.titulo;

    // Actualizar favorito
    if (isFavorite !== null && isFavorite !== undefined) {
      if (isFavorite) {
        user.favoriteBooks[bookId] = book;
        console.log('➕ Agregado a favoritos:', bookId);
      } else {
        delete user.favoriteBooks[bookId];
        console.log('➖ Removido de favoritos:', bookId);
      }
      // IMPORTANTE: Decirle a Mongoose que favoriteBooks fue modificado
      user.markModified('favoriteBooks');
    }

    // Cambiar estado si es necesario
    if (newStatus) {
      const statusMap = {
        'Pendiente': 'pendiente',
        'Leyendo': 'leyendo',
        'Leído': 'leido'
      };

      const dbStatus = statusMap[newStatus] || newStatus.toLowerCase();

      // Buscar y remover de todas las categorías usando título como identificador
      ['pendiente', 'leyendo', 'leido'].forEach(section => {
        user.userBooks[section] = user.userBooks[section].filter(b => {
          return b.titulo !== book.titulo;
        });
      });

      // Agregar a la nueva categoría
      if (!user.userBooks[dbStatus]) {
        user.userBooks[dbStatus] = [];
      }
      user.userBooks[dbStatus].push(book);
    }

    await user.save();

    console.log('✅ ANTES DE RESPONDER en updateBookStatus, favoriteBooks tiene:', {
      count: Object.keys(user.favoriteBooks).length,
      titles: Object.keys(user.favoriteBooks)
    });

    res.json({
      status: 'Success',
      userBooks: user.userBooks,
      favoriteBooks: user.favoriteBooks
    });
  } catch (error) {
    console.error("Error al actualizar libro:", error);
    res.status(500).json({ status: 'Error', error: "Error al actualizar libro" });
  }
};

// Remover libro de la biblioteca
const removeBookFromUserLibrary = async (req, res) => {
  try {
    const { userId } = req.params;
    const { book, section } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 'Error', message: 'Usuario no encontrado' });
    }

    const statusMap = {
      'Pendiente': 'pendiente',
      'Leyendo': 'leyendo',
      'Leído': 'leido'
    };

    const dbSection = statusMap[section] || section.toLowerCase();

    // Remover de la sección especificada
    if (user.userBooks[dbSection]) {
      user.userBooks[dbSection] = user.userBooks[dbSection].filter(b => {
        return b.titulo !== book.titulo;
      });
    }

    // Remover de favoritos si está ahí
    const bookId = book.titulo;
    delete user.favoriteBooks[bookId];
    // IMPORTANTE: Decirle a Mongoose que favoriteBooks fue modificado
    user.markModified('favoriteBooks');

    await user.save();

    res.json({
      status: 'Success',
      userBooks: user.userBooks,
      favoriteBooks: user.favoriteBooks
    });
  } catch (error) {
    console.error("Error al remover libro:", error);
    res.status(500).json({ status: 'Error', error: "Error al remover libro" });
  }
};

module.exports = {
  getAllBooks,
  getUserLibraries,
  addBookToUserLibrary,
  updateBookStatus,
  removeBookFromUserLibrary
};
