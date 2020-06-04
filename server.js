const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const chalk = require("chalk");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });
dotenv.config({ path: "./config/mongodb.env" });
dotenv.config({ path: "./config/geocoder.env" });

// Connect to the database.
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

// Route files
const bootcamps = require("./routes/bootcamps");

// Express application setup.
const app = express();
app.use(express.json());

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

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    chalk.yellow(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
    ),
  ),
);

// Handle any unhandled promise rejections.
process.on("unhandledRejection", (err, promise) => {
  console.log(chalk.red(`Error: ${err.message}`));
  server.close(() => {
    process.exit(1);
  });
});

module.exports = server;
