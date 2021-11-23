var mongoose = require("mongoose");
var Schema = mongoose.Schema

var authorSchema = new Schema({
    name:String,
    email:String,
    country:String,
    bookIds:[{type:Schema.Types.ObjectId,ref:"Book"}]
})

var Author = mongoose.model("Author",authorSchema)

module.exports = Author;