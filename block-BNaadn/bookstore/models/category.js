var mongoose = require("mongoose");
var Schema = mongoose.Schema

var categorySchema = new Schema({
    title:String,
    summary:String,
    pages:Number,
    publication:String,
    cover_image:String,
})

var Category = mongoose.model("Category",categorySchema)

module.exports = Category