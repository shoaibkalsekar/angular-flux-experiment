var express = require("express");

var app = express();

app
  .set("view engine", "ejs")
  .use(express.static("./public"))

app.get("/", function(req, res){
  res.render("index");
});


app.listen(3000);