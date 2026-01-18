const express = require("express");
const { 
  getAllBooks, 
  getUserLibraries, 
  addBookToUserLibrary,
  updateBookStatus,
  removeBookFromUserLibrary
} = require("../controllers/bookController.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", verifyToken, getAllBooks);
router.get("/biblioteca/:userId", verifyToken, getUserLibraries);
router.post("/biblioteca/:userId", verifyToken, addBookToUserLibrary);
router.put("/biblioteca/:userId", verifyToken, updateBookStatus);
router.delete("/biblioteca/:userId", verifyToken, removeBookFromUserLibrary);

module.exports = router;
