// Function to render articles saved to the database upon load. Will utilize the create cards function. 

// Function to dynamically create the cards that will hold each article.

// Function to handle a new scrape when the user clicks the "New Scrape" button.

// Maybe a function to handle clearing/emptying the page of articles when the user clicks the "Clear Articles" button.

$(document).ready(function() {

    let articleContainer = $(".article-container");

    // $(document).on("click", ".scrape-new", handleArticleScrape);

    // $(".clear").on("click", handleArticleClear);

    function initPage() {
        $.getJSON("/articles", function(data) {
            console.log("HERE IS YOUR ARTICLE DATA ---- " + JSON.stringify(data));
            articleContainer.empty();

            if (data && data.length) {
                renderArticles(data); //Need to write this function
            }
            else {
             renderEmpty(); // Need to write this function 
            }
        })
    };

    function renderArticles(articles) {

        let articleCards = [];

        for (var i = 0; i < articles.length; i++) {
            articleCards.push(createCard(articles[i]));
        }

        articleContainer.append(articleCards);

    };

    function createCard(article) {
        let card = $("<div class='card'>");
        let cardHeader = $("<div class='card-header'>");
        let cardBody = $("<div class='card-body'>").append($("<h5 class='card-title'>").text(article.headline),
        $("<p class='card-text'>").text(article.summary),
        $("<a class='btn btn-primary'>").attr("href", article.link).text("Go to article"))

        card.append(cardHeader, cardBody);

        return card;
    };




    $.getJSON("/articles", function(data) {
    
        console.log("This is data " + data);
        for (let i = 0; i < data.length; i++) {
            console.log("This is data[i] " + data[i]);
    
            
            
            $(".articles").append("<p data-id='" + JSON.stringify(data[i]._id) + "'>" + JSON.stringify(data[i].headline) + "<br />" + JSON.stringify(data[i].link) + "</p>");
        };
    });








    initPage();
});
