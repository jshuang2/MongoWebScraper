$(document).ready(function() {

    const articleContainer = $(".article-container");
    $(document).on("click", ".scrape-new", handleArticleScrape);
    $(".clear").on("click", handleArticleClear);

    function initPage() {
        $.get("/articles").then(function(data) {
            articleContainer.empty();

            if (data && data.length) {
                renderArticles(data); //Need to write this function
            }
            else {
             renderEmpty(); // Need to write this function 
            }
        })
    }
    // Function to render articles saved to the database upon load. Will utilize the create cards function. 

    // Function to dynamically create the cards that will hold each article.

    // Function to handle a new scrape when the user clicks the "New Scrape" button.

    // Maybe a function to handle clearing/emptying the page of articles when the user clicks the "Clear Articles" button.


    // $.getJSON("/articles", function(data) {
    
    //     console.log("This is data " + data);
    //     for (let i = 0; i < data.length; i++) {
    //         console.log("This is data[i] " + data[i]);
    
            
            
    //         $(".articles").append("<p data-id='" + JSON.stringify(data[i]._id) + "'>" + JSON.stringify(data[i].headline) + "<br />" + JSON.stringify(data[i].link) + "</p>");
    //     };
    // });








    initPage();
});
