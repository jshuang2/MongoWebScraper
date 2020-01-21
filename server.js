const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoWebScraper";

mongoose.connect(MONGODB_URI);



app.get("/scrape", function(req, res) {
    axios.get("https://www.seattletimes.com/").then(function(response) {
        let $ = cheerio.load(response.data);

        // console.log($);
        // console.log(response);

        $("li.top-stories-list-item").each(function(i, element) {
            let result = {};
            

            result.summary = $(this)
                .children("a")
                .text().trim();
            result.link = $(this)
                .children("a")
                .attr("href")
                
            result.headline = axios.get(result.link).then(function(res) {
                console.log("RESULT.LINK IS HERE", result.link)
                        let stuff = cheerio.load(res.data);
                        // console.log("this is stuff ----------------", res.data);
                    
                        
                    
                        stuff("h1.article-title").each(function(i, element) {
                            result.headline = stuff(this).text().trim();
                            // console.log("THIS IS RESULT HEADLINE TWO: -------------- ", result.headline, "END");
                            console.log("THIS SHOULD BE FINAL RESULT OBJECT " + JSON.stringify(result));
                            
                        })

                        db.Article.create(result)
                            .then(function(dbArticle) {
                                console.log(dbArticle);
                            })
                            .catch(function(err) {
                                console.log(err);
                            });

                    })
            
        })
        res.send("Scrape Complete");
    });
});

app.get("/articles", function(req, res) {
    db.Article.find({})
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
    .populate("comment")
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        console.log(err);
        res.send("No articles found! Please try again.");
    });
});

app.post("/articles/:id", function(req, res) {
    db.Comment.create(req.body)
    .then(function(dbComment) {
        return db.Article.findOneAndUpdate(
            { _id: req.params.id},
            { comment: dbComment._id},
            { new: true}
        );
    })
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});


