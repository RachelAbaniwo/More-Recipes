export default (status, statusCode, data, res, message) => {
  return res.status(statusCode).json({
    status, data, message
  });
};
