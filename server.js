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
        if(data !== undefined && data !== "") {
            return res.json(JSON.parse(data));
        }
        else {
            return res.json(false);
        }
    });
});

//Defining the POST API to add a new note to the db.json
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    var notesList = [];
    var fileName = path.join(__dirname,"/db/db.json");
    fs.readFile(fileName,"utf8",function(err, data){
        if(err) throw err;
        //Check if the db.json is empty
        if(data !== undefined && data !== "") {
            notesList = JSON.parse(data);
            notesList.push({
                //Add 1 to the last note's id and assign it to the new note's id
                id: notesList.length + 1,
                title: newNote.title,
                text: newNote.text
            });
        }
        else {
            //db.json is empty hence assign the new note as the first note with id 1
            notesList.push({
                id: 1,
                title: newNote.title,
                text: newNote.text
            });
        }
        //Write the entire notes list back to db.json
        fs.writeFile(fileName, JSON.stringify(notesList), function(err) {
            if(err) throw err;
            res.json({
                status: "success"
            });
        });
    });
});

//Defining the DELETE API to delete the note whose id is passed as parameter
app.delete("/api/notes/:id", function(req, res) {
    var id = req.params.id;
    var notesList = [];
    var fileName = path.join(__dirname,"/db/db.json");
    fs.readFile(fileName,"utf8",function(err, data){
        if(err) throw err;
        //Check if the db.json is empty
        if(data !== undefined && data !== "") {
            notesList = JSON.parse(data);
            //Delete the note whose id matches the passed id value
            for(var i=0; i<notesList.length; i++) {
                if(notesList[i].id == id) {
                    notesList.splice(i,1);
                    i--;
                    break;
                }
            }
            //Redefine the ids of the notes in the database
            for(var i=0; i<notesList.length; i++) {
                notesList[i].id = i+1;
            }
            //Write the entire notes list back to db.json
            fs.writeFile(fileName, JSON.stringify(notesList), function(err) {
                if(err) throw err;
                res.json({
                    status: "success"
                });
            });
        }
        else {
            // Status code for No Content
            res.status(204);
        }
    });
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
