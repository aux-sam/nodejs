const path = require("path");
const express = require("express");
const app = express();

// EJS
app.set("view engine","ejs")
app.set('views',path.join(__dirname,'/pages'))
app.use(express.static(path.join(__dirname,'/public'))); // set path for assets folder

//Routes
app.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page",
    students: [
      {
        name: "John Doe",
        major: "CAP",
      },
      {
        name: "Jane Doe",
        major: "CAP",
      },
    ],
  });
});

app.listen(3000)
