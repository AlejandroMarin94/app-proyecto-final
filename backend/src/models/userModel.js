const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: [true, "El apellido es obligatorio"],
    minlength: [3, "El apellido debe tener al menos 3 caracteres"],
    maxlength: 30,
  },
  age: {
    type: String,
    required: [false, "La edad no es obligatoria"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: [true, "Ese email ya existe"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  userBooks: {
    type: {
      pendiente: [mongoose.Schema.Types.Mixed],
      leyendo: [mongoose.Schema.Types.Mixed],
      leido: [mongoose.Schema.Types.Mixed]
    },
    default: {
      pendiente: [],
      leyendo: [],
      leido: []
    }
  },

  favoriteBooks: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }

});

const userModel = mongoose.model('User', userSchema, 'users');
module.exports = userModel;