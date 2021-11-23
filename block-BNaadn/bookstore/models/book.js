var mongoose = require("mongoose");
var Schema = mongoose.Schema

var bookSchema = new Schema({
    title:String,
    summary:String,
    pages:Number,
    publication:String,
    cover_image:String,
    authorId:{type:Schema.Types.ObjectId,ref:"author"}
})

var Book = mongoose.model("Book",bookSchema)

module.exports = Book