const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../../database/User');
const CONFIG = require('../../CONFIG/CONFIG');

module.exports = async (request, response, next) => {
  const usernameValue = request.body.username;
  const passwordValue = request.body.password;

  const validationResult = (usernameValue
                         && passwordValue
                         && usernameValue.match(CONFIG.REGEX.username)
                         && passwordValue.match(CONFIG.REGEX.password));

  if (!validationResult) {
    return response.status(400).json({
      message: 'userSigninError',
    });
  }
  const matchedDocument = await User.findOne({ username: usernameValue }).exec().catch(next);
  if (!matchedDocument) {
    return response.status(401).json({
      message: 'nonexistentUser',
    });
  }
  const authResult = await bcrypt.compare(passwordValue, matchedDocument.password).catch(next);
  if (authResult) {
    const { username } = matchedDocument;
    const { key, expirationDate } = CONFIG.JWT;
    const jwt = jsonwebtoken
      .sign({ username }, key, { expiresIn: expirationDate });
    return response.status(200).json({
      username,
      jwt,
      message: 'authSuccessful',
    });
  }
  return response.status(400).json({
    message: 'userSigninError',
  });
};
