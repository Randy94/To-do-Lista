//sovelluksen tarvitsemat riippuvuudet
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//renderöi public tiedostot.
app.use(express.static("public"));

//placeholders uusille taskeille
var task = ["tee projekti" , "Muista pestä kädet"];
//placeholders for poistetuille taskeille
var complete = ["harjoittele lisää rest apin käyttöä"];

//Lisätään uusi task
app.post("/add", function(req, res) {
    var newTask = req.body.newtask;
    //add the new task from the post route
    task.push(newTask);
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    // tarkista, onko eri suoritetun tehtävän "tyyppi", ja lisää sitten suoritettuun tehtävään.
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        //Katso jos suoritettu tehtävä on jo olemassa ja poista se.
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

//renderöi ejs ja näytä lisätty tehtävä, valmis tehtävä.
app.get("/", function(req, res) {
    res.render("index", { task: task, complete: complete });
});

//Pistä appi kuuntelemaan porttia  3000.
app.listen(3000, function() {
    console.log("server is running on port 3000");
});