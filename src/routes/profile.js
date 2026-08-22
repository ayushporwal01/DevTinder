const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

router.get("/profile/view", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isEditAllowed = validateEditProfileData(req);

    if (!isEditAllowed) {
      throw new Error("Invalid Edit Request!");
    }

    const user = req.user;

    Object.keys(req.body).forEach((field) => (user[field] = req.body[field]));

    await user.save();

    res.json({
      message: `${user.firstName}, your profile updated successfully`,
      data: user,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = router;
