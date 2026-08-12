const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://porwalayush953_db_user:i0MSKu8tG3I3TiCF@namastenodejs.nnvpyuv.mongodb.net/devTinder?tls=true",
  );
};

module.exports = connectDB;
