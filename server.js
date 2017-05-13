var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var reservations = [];
var waitlist = [];


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});
app.post("/api/new", function(req, res) {
  var newreservation = req.body;

  newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();
  res.json(newreservation);
  console.log(newreservation);
  if(reservations.length < 5) {
  reservations.push(newreservation);

  } else {
  	waitlist.push(newreservation);

  }


});



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});