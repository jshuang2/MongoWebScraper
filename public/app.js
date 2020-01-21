$.getJSON("/articles", function(data) {
    
    console.log("This is data " + data);
    for (let i = 0; i < data.length; i++) {
        console.log("This is data[i] " + data[i]);

        $("#articles").append("<p data-id='" + JSON.stringify(data[i]._id) + "'>" + JSON.stringify(data[i].headline) + "<br />" + JSON.stringify(data[i].link) + "</p>");
    };
});