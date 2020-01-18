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

        console.log($);
        console.log(response);

        $("li").each(function(i, element) {
            let result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            
            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    console.log(err);
                });
        });
        res.send("Scrape Complete");
    });
});


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});


