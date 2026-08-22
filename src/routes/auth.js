const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { ValidateSignUpData } = require("../utils/validation");

router.post("/signup", async (req, res) => {
  try {
    //Validation of data
    ValidateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //Creating a new user of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    console.log(user);

    await user.save();
    res.send("User Added Successfully!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPassword = await user.validatePassword(password);
    console.log(isPassword);

    if (isPassword) {
      //Create a JWT token
      const token = await user.getJWT();
      console.log(token);

      //Add the token to cookie and sends the response back to the user
      res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7days
      });
      res.send("Login Successful!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

module.exports = router;
