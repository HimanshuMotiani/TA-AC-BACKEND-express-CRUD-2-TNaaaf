var express = require('express');
var Article = require("../models/article");
var Comment = require("../models/comment")
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
// router.get('/:id', function(req, res, next) {
//     var id = req.params.id;
//     Article.findById(id,(err,article)=>{
//         if(err) return next(err);
//         Comment.find({articleId:id},(err,comments)=>{
//             res.render("articlesDetail",{article,comments})
//         })
//   })
// });

// or using populate

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Article.findById(id).populate('comments').exec((err,article)=>{
        if(err) return next(err);
        console.log(article);
            res.render("articlesDetail",{article})
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
        Comment.deleteMany({articleId:book.id},(err,book)=>{
            res.redirect("/articles")
        })
        
    })
})

//like
router.get("/:id/likes", (req, res) => {
    var id = req.params.id
    Article.findByIdAndUpdate(id,{$inc:{likes:1}} ,(err, article) => {
        if (err) return next(err);
        res.redirect("/articles/"+id)
    })
})

//comments
router.post("/:id/comments", (req, res) => {
    var id = req.params.id;
    req.body.articleId = id;
    Comment.create(req.body,(err,comment)=>{
        if (err) return next(err);
        Article.findByIdAndUpdate(id,{$push:{comments:comment.id}},(err,comment)=>{
            if (err) return next(err);  
            res.redirect("/articles/"+ id)
        })
    })
})



module.exports = router;