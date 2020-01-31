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

//Defining the API to read the notes from db.json and return the notes list as JSON object
app.get("/api/notes", function(req, res) {
    var fileName = path.join(__dirname,"/db/db.json");
    fs.readFile(fileName,"utf8",function(err, data){
        if(err) throw err;
        console.log(data);
        if(data !== undefined && data !== "") {
            return res.json(JSON.parse(data));
        }
        else {
            return res.json(false);
        }
    });
});

app.post("/api/notes", function(req, res) {

});

app.delete("/api/notes/{id}", function(req, res) {

});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
