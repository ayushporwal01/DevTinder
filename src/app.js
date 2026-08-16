const dns = require("dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

//API - Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({});

    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

//Feed API - Get all the users from the DB
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});

    if (!users.length) {
      res.status(404).send("User not found!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

//Creates an instance of User model and saves it into the database
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  console.log(user);

  try {
    await user.save();
    res.send("User Added Successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

//Deletes user by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("Deleted user successfully");
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

//Entirely updates a user by given filter
app.put("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const user = await User.findOneAndReplace({ _id: userId }, data);
    res.send("Entirely updated user successfully");
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

//Partially updates a user by id
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "password",
      "about",
      "photoUrl",
      "skills",
      "emailId",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data.skills?.length > 10) {
      throw new Error("Skills can not be more than 10");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
      runValidators: true,
    });
    res.send("Updated user successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED: " + err.message);
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
