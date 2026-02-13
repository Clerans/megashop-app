module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Log only unexpected errors
  if (!err.isOperational) {
    console.error('UNEXPECTED ERROR:', err);
  }

  res.status(statusCode).json({
    success: false,
    data: null,
    error: err.isOperational
      ? err.message
      : 'Internal server error',
  });
};
