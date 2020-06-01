// The logger middleware is used to set a value on the request object
// that can then be accessed in any routes.
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`,
  );
  next();
};

module.exports = logger;
