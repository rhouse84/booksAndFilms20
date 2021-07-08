"use strict";

var mongoose = require("mongoose");
var Author = mongoose.model("Author");

// Get Authors
module.exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search Authors
module.exports.searchAuthors = async (req, res) => {
  var search = req.params._search;
  var regx = new RegExp(search, "gi");
  let authors;
  try {
    authors = await Author.find({ name: { $regex: regx } });
    if (authors == null) {
      return res.status(404).json({ message: "String not found" });
    }
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Author
module.exports.getAuthor = async (req, res) => {
  var id = req.params._id;
  let author;
  try {
    author = await Author.findById(id);
    if (author == null) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ message: "Author not found" });
  }
};

// Add Author
module.exports.addAuthor = async (req, res) => {
  const author = req.body;
  try {
    const newAuthor = await Author.create(author);
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Author
module.exports.updateAuthor = async (req, res, next) => {
  var query = { _id: req.params._id };
  var author = req.body;
  await Author.update(query, author, {}, (err, author) => {
    if (err) return next(err);
    res.json(author);
  });
};

// Remove Author
module.exports.removeAuthor = (req, res, next) => {
  var query = { _id: req.params._id };
  Author.remove(query, (err, author) => {
    if (err) return next(err);
    res.json(author);
  });
};
