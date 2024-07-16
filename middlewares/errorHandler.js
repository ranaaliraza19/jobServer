module.exports = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = "Invalid data. Please check your request.";
  }

  console.error(err);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};
