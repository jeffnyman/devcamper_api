const express = require("express");
const dotenv = require("dotenv");

// Route files
const bootcamps = require("./routes/bootcamps");

dotenv.config({ path: "./config/config.env" });

const app = express();

// Mount routers onto specific urls.
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

module.exports = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
