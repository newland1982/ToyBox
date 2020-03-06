const User = require('../../database/User');
const CONFIG = require('../../CONFIG/CONFIG');

module.exports = async (request, response, next) => {
  const decodedUsernameValue = request.decodedJwt.username;

  const validationResult = (decodedUsernameValue
                        && decodedUsernameValue.match(CONFIG.REGEX.username));

  if (!validationResult) {
    return response.status(400).json({
      message: 'authenticationError',
    });
  }
  const matchedDocument = await User.findOne({ username: decodedUsernameValue })
    .exec().catch(next);
  if (!matchedDocument) {
    return response.status(401).json({
      message: 'nonexistentUser',
    });
  }

  return response.status('200').json({
    message: 'authenticationAllowed',
  });
};
