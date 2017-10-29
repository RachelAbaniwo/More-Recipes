export default (status, statusCode, data, res) => {
  return res.status(statusCode).json({
    status, data
  });
};
