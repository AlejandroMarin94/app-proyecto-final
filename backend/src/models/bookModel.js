const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  titulo: {
    type: String,
    required: [true, "El título es obligatorio"],
  },
  autor: {
    type: String,
    required: [true, "El autor es obligatorio"],
  },
  fechaPublicacion: {
    type: String,
    default: "Fecha desconocida",
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  descripcion: {
    type: String,
    default: "",
  },
  categoria: {
    type: String,
    default: "",
  },
  isbn: {
    type: String,
    default: "",
  },
  cover: {
    type: String,
    default: null,
  },
}, { timestamps: true });

const bookModel = mongoose.model('Book', bookSchema, 'books');
module.exports = bookModel;
