module.exports = (request, response) => {
  response.status(200).json({
    message: response.statusCode,
  });
};
