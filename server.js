const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");
let nextId = bookings.length;

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

app.get("/bookings", function(request, response) {
  response.send(bookings)
});

app.get("/bookings/:id", function(request, response) {
  const selectedBooking = bookings.find(item => request.params.id == item.id);

  if(selectedBooking)
    response.send(selectedBooking);
  else
    response.sendStatus(404);
});

app.post("/bookings", function(request, response) {
  let newBooking = request.body;
  newBooking.id = ++nextId;

  bookings.push(newBooking);
  response.status(201).send(newBooking);
});

app.delete("/bookings/:id", function(request, response) {
  const selectedBooking = bookings.find(item => request.params.id == item.id);

  if(selectedBooking) {
    bookings.splice(selectedBooking, 1);
    response.sendStatus(204);
  }   
  else
    response.sendStatus(404);
});
// TODO add your routes and helper functions here

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
