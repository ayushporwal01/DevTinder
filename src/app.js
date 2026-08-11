const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.get("/admin", adminAuth, (req, res) => {
  res.send("Welcome Admin!");
});

app.get("/user/login", (req, res) => {
  res.send("User logged in successfully!");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

app.listen(7777, () => {
  console.log("Server is listening at port 7777");
});
