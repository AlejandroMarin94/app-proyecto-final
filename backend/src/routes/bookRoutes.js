const express = require("express");
const { searchBooks } = require("../controllers/bookController.js");

const router = express.Router();

router.get("/search", searchBooks);
module.exports = router;
