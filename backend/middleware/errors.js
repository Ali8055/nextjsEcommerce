export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  let error = { ...err };
  error.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  });
};
