import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookModel from './src/models/bookModel.js';

dotenv.config();

async function eliminarLibros() {
  try {
    await mongoose.connect(process.env.URL_MONGODB);
    console.log('Conectado a MongoDB');

    // Libros a eliminar
    const librosAEliminar = [
      'El Hobbit'
    ];

    // Eliminar los libros
    const result = await bookModel.deleteMany({
      titulo: { $in: librosAEliminar }
    });

    console.log(`${result.deletedCount} libros eliminados`);

    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

eliminarLibros();
