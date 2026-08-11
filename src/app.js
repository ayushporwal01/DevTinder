const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
  // try {
  throw new Error("xjdhfjhf");

  res.send("User Data Sent");
  // } catch {
  //   res.status(500).send("Some error occurred!");
  // }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Some error occurred!");
  }
});

app.listen(7777, () => {
  console.log("Server is listening at port 7777");
});
