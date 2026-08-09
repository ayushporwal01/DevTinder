const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstname: "Ayush", lastname: "Porwal" });
});

app.post("/user", (req, res) => {
  res.send("Data successfully saved to database!");
});

app.delete("/user", (req, res) => {
  res.send("Deleted successfully!");
});

app.use("/test", (req, res) => {
  res.send("Test is running");
});

app.listen(7777, () => {
  console.log("Server is listening at port 7777");
});
