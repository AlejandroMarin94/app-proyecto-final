require('dotenv').config();
const express = require ("express");
const cors = require ("cors");

const connectToDatabase = require ('./src/db/database');
const authRouters = require ('./src/routes/authRouters');

const PORT = Number(process.env.PORT || 3000);


const server = express();

server.use(express.json());
connectToDatabase();


server.use (
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
)

server.use("/api/auth", authRouters);

server.listen(PORT, ()=>{
  console.log(`servidor corriendo en http://localhost:${PORT}`);


});