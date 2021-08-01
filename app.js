// modules
const express = require("express");
const layouts = require("express-ejs-layouts");
const database = require("./questions.js");

// app
const app = express();
const port = process.env.PORT || 3000;

// app configurting
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use(layouts);
app.use(express.urlencoded({ extended: true }));

// routing
app.get("/", (req, res) => {
    res.render("home", {title: "Computer quiz"});
});

app.get("/all-quiz", (req, res) => {

    const sets = [];
    for (let i = 0; i < database.length; i++) {
        sets.push({
            id: database[i][0]['id'],
            name: database[i][0]['set']
        });
    }

    res.render("all-quiz", {
        title: "All Quiz",
        data: sets
    });
});

app.get("/quiz", (req, res) => {

    if (!req.query.id)
    {
        console.error("Question set id is not supplied");
        res.redirect("/");
    }

    const question_set = database[req.query.id];

    if (!question_set)
    {
        console.error("Question set id is not valid");
        res.redirect("/");
    }

    let set_name = question_set[0]['set'];

    res.render("quiz", {
        title: set_name,
        data: question_set
    });
});
app.post("/quiz", (req, res) => {

    const report = require("./report.js");
    const data_portion = database[req.query.id];
    const user_answer = req.body;

    const result = report(user_answer, data_portion);

    // redirect to the homepage
    res.render("report", {title: data_portion[0]["set"], data: result});
});

app.get("/about", (req, res) => {
    res.render("about", {title: "About it"});
});

// 404 Error Page
app.get("*", (req, res) => {
    res.render("notFound", {title: "404 Not Found"});
});

// listening
app.listen(port);