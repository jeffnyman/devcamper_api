const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Handling a bad Mongoose ObjectId.
  if (err.name === "CastError") {
    const message = `Bootcamp ID ${err.value} is malformed`;

    error = new ErrorResponse(message, 400);
  }

  // Handling Mongoose duplicate key.
  if (err.name === "MongoError" && err.code === 11000) {
    const message = `Duplicate field entered: ${Object.keys(
      err.keyValue,
    )}; value is ${Object.values(err.keyValue)}`;

    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
