const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../../database/User');
const CONFIG = require('../../CONFIG/CONFIG');

module.exports = async (request, response, next) => {
  const decodedUsernameValue = request.decodedJwt.username;

  const validationResult = (decodedUsernameValue
                        && decodedUsernameValue.match(CONFIG.REGEX.username));

  if (!validationResult) {
    return response.status(400).json({
      message: 'passwordChangeError',
    });
  }
  const matchedDocument = await User.findOne({ username: decodedUsernameValue })
    .exec().catch(next);
  if (!matchedDocument) {
    return response.status(401).json({
      message: 'nonexistentUser',
    });
  }
  const password = crypto
    .createHash('sha256')
    .update(decodedUsernameValue + Date.now() * Math.random() + CONFIG.PASSWORD.seedAdditon)
    .digest('hex');
  const hashedPassword = await bcrypt.hash(password, 10).catch(next);
  const { username } = matchedDocument;
  const { key, expirationDate } = CONFIG.JWT;
  await User.findOneAndUpdate(username, { $set: { password: hashedPassword } })
    .exec().catch(next);
  const jwt = jsonwebtoken
    .sign({ username }, key, { expiresIn: expirationDate });
  return response.status('200').json({
    username,
    password,
    jwt,
    message: 'passwordHasBeenChanged',
  });
};
