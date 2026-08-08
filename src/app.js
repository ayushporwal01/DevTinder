const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/test", (req, res) => {
  res.send("Test is running");
});

app.get("/hello", (req, res) => {
  res.send("Hello Hello Hello!");
});

app.listen(7777, () => {
  console.log("Server is listening at port 7777");
});
