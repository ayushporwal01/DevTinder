const dns = require("dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { ValidateSignUpData } = require("./utils/validation");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

//Creates an instance of User model and saves it into the database
app.post("/signup", async (req, res) => {
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

//Finds user by email and checks password
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPassword = await ValidatePassword(password);
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

app.get("/profile", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    console.log("ERROR: " + err.message);
  }
});

app.post("/sentConnectionRequest", userAuth, (req, res) => {
  try {
    const user = req.user;
    console.log("Sending a connection request...");

    res.send(user.firstName + " sent a connection request!");
  } catch (err) {
    console.log("ERROR: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Connection successfully established!");
    app.listen(7777, () => {
      console.log("Server is listening at port 7777");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected", err);
  });
