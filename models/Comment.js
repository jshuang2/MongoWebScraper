const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let CommentSchema = new Schema({
    comments: [{
        body: String,
        date: Date
    }]
        // required: true
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;