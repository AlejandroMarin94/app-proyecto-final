const mongoose = require('mongoose');


const connectToDatabase = async () => {
    try {
        const URL_MONGODB = process.env.URL_MONGODB;
        await mongoose.connect(URL_MONGODB);
    } catch (error) {
        console.error("Error al conectar a la base de datos MongoDB:", error);
        
    }
};

module.exports = connectToDatabase;