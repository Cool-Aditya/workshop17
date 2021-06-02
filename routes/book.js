const express = require("express");
const router = express.Router();
const Book = require("../models/book");

//Getting all
router.get("/", async (req, res) => {
  try {
    const book = await Book.find();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Getting one
router.get("/:id", getBook, (req, res) => {
  res.json(res.book);
});

router.post("/", async (req, res) => {
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.book = book;
  next();
}

module.exports = router;
