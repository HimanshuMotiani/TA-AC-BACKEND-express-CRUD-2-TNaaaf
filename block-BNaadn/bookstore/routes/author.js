var express = require("express");
const { populate } = require("../models/author");
var router = express.Router();
var Author = require("../models/author")

router.get('/sortbyauthor/:author',(req, res, next) => {
    let author = req.params.author;
    Author.findOne({"name": author}).populate('bookIds').exec((err, author)=>{
      Author.find((err, authors) =>{
        res.render('booksEachAuthor',{books :author.bookIds,name:author.name, authors})
      })
    })
  })

module.exports = router