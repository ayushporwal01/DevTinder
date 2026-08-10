const express = require("express");

const app = express();

app.get(
  "/user",
  (req, res, next) => {
    console.log("Handling the route user 1");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2");
    next();
  },
  (req, res) => {
    console.log("Handling the route user 2");
    res.send("3rd Response");
  },
);

app.listen(7777, () => {
  console.log("Server is listening at port 7777");
});
