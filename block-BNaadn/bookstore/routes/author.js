var express = require("express");
var router = express.Router();

router.get("/",(req,res)=>{
    res.render("authors",{authors:["Apoorva Kumar Singh","Abhay K.","Amit Shah","R P N Singh","Margaret Atwood","Jokha Alharthi"]})
})
router.get("/:id",(req,res)=>{
    var id = req.params.id;

    res.render("authorBooks",{books:["Cricket World Cup: The Indian Challenge","My Journey","Making of New India",	"Whispers of Time"]})
})

module.exports = router