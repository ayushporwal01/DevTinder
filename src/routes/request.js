const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");

router.post("/sentConnectionRequest", userAuth, (req, res) => {
  try {
    const user = req.user;
    console.log("Sending a connection request...");

    res.send(user.firstName + " sent a connection request!");
  } catch (err) {
    console.log("ERROR: " + err.message);
  }
});

module.exports = router;
