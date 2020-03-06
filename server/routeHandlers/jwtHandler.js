const jsonwebtoken = require('jsonwebtoken');

const CONFIG = require('../CONFIG/CONFIG');

module.exports = (request, response, next) => {
  try {
    if (!request.headers.authorization) {
      return next(new Error('noJwt'));
    }
    const jwt = request.headers.authorization.split(' ')[1];
    const decodedJwt = jsonwebtoken.verify(jwt, CONFIG.JWT.key);
    request.decodedJwt = decodedJwt;
    return next();
  } catch (error) {
    return next(new Error('authJwtError'));
  }
};
