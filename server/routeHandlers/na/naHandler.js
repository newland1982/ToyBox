module.exports = (request, response, next) => {
  const error = new Error('notFound');
  error.status = 404;
  next(error);
};
