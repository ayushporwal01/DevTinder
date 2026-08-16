const mongoose = require("mongoose");
const { Schema } = mongoose;

const validator = require("validator");

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
      maxLength: 15,
      unique: true,
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
    photoUrl: {
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

module.exports = mongoose.model("User", userSchema);
