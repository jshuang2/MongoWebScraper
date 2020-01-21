const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ArticleSchema = new Schema({

    headline: {
        type: String,
        // required: true
        unique: true
    },
    summary: {
        type: String,
        // required: true
        unique: true
    },
    link: {
        type: String,
        // required: true
        unique: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;