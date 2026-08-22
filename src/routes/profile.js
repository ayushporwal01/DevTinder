const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");

router.get("/profile", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    console.log("ERROR: " + err.message);
  }
});

module.exports = router;
