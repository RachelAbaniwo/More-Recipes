export default (status, statusCode, data, res) => res.status(statusCode).json({
  status, data
});
