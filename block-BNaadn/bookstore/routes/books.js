var express = require("express");
var router = express.Router();

router.get("/",(req,res)=>{
    res.render("books",{books:["Cricket World Cup: The Indian Challenge","My Journey","Making of New India",	"Whispers of Time"]})
})

module.exports = router