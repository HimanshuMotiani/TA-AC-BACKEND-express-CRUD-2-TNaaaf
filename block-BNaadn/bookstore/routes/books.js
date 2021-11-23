var express = require("express");
var router = express.Router();
var Book = require("../models/book")
var Author = require("../models/author")
router.get("/new", (req, res) => {
    res.render("bookForm")
})
router.post("/", (req, res) => {
    console.log(req.body);
    Book.create(req.body, (err, book) => {
        if (err) return next(err);
        Author.find({}, (err, author) => {
            if (err) return next(err);
            let isExists = author.some(ele => ele.name === req.body.author);
            if (!isExists) {
                Author.create({ "name": req.body.author, "bookIds": new Array([book.id]) }, (err, author) => {
                    if (err) return next(err);
                    Book.findByIdAndUpdate(book.id, { "authorId": author.id }, (err, book) => {
                        if (err) return next(err);
                        res.redirect("/books")
                    })
                })
            } else {
                Author.findOneAndUpdate({ name: req.body.author }, { $push: { bookIds: book._id } }, { new: true }, (err, author) => {
                    if (err) return next(err);
                    Book.findByIdAndUpdate(book._id, { "authorId": author._id }, (err, book) => {
                        if (err) return next(err);
                        res.redirect('/books')
                    })
                })
            }
        })
    });
});

router.get("/", (req, res) => {
    Book.find({}).populate("authorId").exec((err, books) => {
        if (err) return next(err);
        res.render("books", { books })
    })
})
router.get("/sortbyauthor", (req, res) => {
    Author.find({}, (err, authors) => {
        if (err) return next(err);
        res.render("authorNames", { authors })
    })
})

module.exports = router