const mongoose = require("mongoose");
const chalk = require("chalk");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(
    chalk.underline.bold.cyan(`MongoDB Connected: ${conn.connection.host}`),
  );
};

module.exports = connectDB;
