var express = require(`express`);
var path = require("path");
var fs = require("fs");
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Using the static middleware function to server the static files in Express from the defined folder name
app.use(express.static('assets'));

var PORT = process.env.PORT || 3000;

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", function(req, res) {

});

app.post("/api/notes", function(req, res) {

});

app.delete("/api/notes/{id}", function(req, res) {

});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
