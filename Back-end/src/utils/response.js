exports.success = (res, statusCode, data) => {
  res.status(statusCode).json({
    success: true,
    data,
    error: null
  });
};
