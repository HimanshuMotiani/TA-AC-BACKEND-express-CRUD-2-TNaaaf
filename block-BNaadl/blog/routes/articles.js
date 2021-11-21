var express = require('express');
var Article = require("../models/article")
var router = express.Router();

/* GET articles listing. */
router.get('/', function(req, res, next) {
    Article.find({},(err,articlesList)=>{
        if(err) return next(err);
        res.render("articles",{articlesList : articlesList });
    })
});
router.get('/new', function(req, res, next) {
    res.render("articleForm");
});
router.post('/', function(req, res, next) {
  Article.create(req.body,(err,articleAdd)=>{
      res.redirect("/articles")
})
})
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Article.findById(id,(err,article)=>{
        if(err) return next(err);
        res.render("articlesDetail",{article:article})
  })
});
router.get('/:id/edit', function(req, res, next) {
    var id = req.params.id;
    Article.findById(id,(err,article)=>{
        if(err) return next(err);
        res.render("articleUpdateForm",{article:article})
  })
});
router.post('/:id', function(req, res, next) {
    var id = req.params.id;
    console.log("abc");
    Article.findByIdAndUpdate(id,req.body,(err,article)=>{
        if(err) return next(err);
        res.redirect("/articles")
  })
});
router.get("/:id/delete", (req, res) => {
    var id = req.params.id
    Article.findByIdAndDelete(id, (err, deletedArticle) => {
        if (err) return next(err);
        res.redirect("/articles")
    })
})


module.exports = router;
