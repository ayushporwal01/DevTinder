const mongoose = require("mongoose");
const { Schema } = mongoose;

const validator = require("validator");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: "1",
      maxLength: "50",
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: "1",
      maxLength: "50",
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (
          !validator.isEmail(value, {
            host_whitelist: ["gmail.com"],
          })
        ) {
          throw new Error("Invalid email address " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 60,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid!");
        }
      },
    },
    about: {
      type: String,
      minLength: 0,
      maxLength: 200,
      default: "This is the default about of user",
    },
    photoURL: {
      type: String,
      default:
        "https://toppng.com/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png",

      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL");
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = function () {
  const user = this;

  const token = jwt.sign({ _id: user._id }, "DEV@Tinder$66", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordEnteredByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordEnteredByUser,
    passwordHash,
  );

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
