var express = require("express");
var router = express.Router();
var Book = require("../models/book")
var Author = require("../models/author")
router.get("/new", (req, res) => {
    res.render("bookForm")
})
router.post("/", (req, res) => {
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
router.get("/sortbycategory", (req, res) => {
    Book.find({}, (err, books) => {
        if (err) return next(err);
        console.log(books);
        var categories = books.map(ele=>{return ele.category});
        let uniqueCategories = [...new Set(categories)];
        res.render("booksByCategory", { uniqueCategories })
    })
})
router.get("/sortbycategory/:id", (req, res) => {
    let categoryName = req.params.id;
    Book.find({category:categoryName}).populate("authorId").exec((err, books) => {
        if (err) return next(err);
        Book.find((err, titles) =>{
        var categories = titles.map(ele=>{return ele.category});
        let uniqueCategories = [...new Set(categories)];
        res.render('booksByEachCategory', {books,uniqueCategories});
    })
})
})

module.exports = router;