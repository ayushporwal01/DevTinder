const validator = require("validator");

const ValidateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!emailId || !validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!password || !validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

module.exports = { ValidateSignUpData };
