const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const chalk = require("chalk");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });
dotenv.config({ path: "./config/mongodb.env" });

// Connect to the database.
connectDB();

// Route files
const bootcamps = require("./routes/bootcamps");

const app = express();

// Use logger middleware.
if (process.env.NODE_ENV === "development") {
  const morganChalk = morgan((tokens, req, res) => {
    return [
      chalk.blue.bold(tokens.method(req, res)),
      chalk.yellow.bold(tokens.status(req, res)),
      chalk.cyan(tokens.url(req, res)),
      chalk.yellow(tokens["response-time"](req, res) + " ms"),
    ].join(" ");
  });

  app.use(morganChalk);
}

// Mount routers onto specific urls.
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

module.exports = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
