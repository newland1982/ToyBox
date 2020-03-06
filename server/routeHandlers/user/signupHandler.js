const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../../database/User');
const CONFIG = require('../../CONFIG/CONFIG');

module.exports = async (request, response, next) => {
  const usernameValue = request.body.username;
  const trigerValue = request.body.triger;

  const validationResult = (usernameValue
                         && usernameValue.match(CONFIG.REGEX.username));

  if (!validationResult) {
    return response.status(400).json({
      message: 'userSignupError',
    });
  }
  const matchedDocument = await User.findOne({ username: usernameValue }).exec().catch(next);
  if (matchedDocument && (trigerValue === 'input')) {
    return response.status(409).json({
      message: 'alreadyExists',
    });
  }
  if (!matchedDocument && (trigerValue === 'input')) {
    return response.status(200).json({
      message: 'validNewUsername',
    });
  }
  if (!matchedDocument && (trigerValue === 'submitButton')) {
    const password = crypto
      .createHash('sha256').update(usernameValue + Date.now() * Math.random() + CONFIG.PASSWORD.seedAdditon)
      .digest('hex');
    const hashedPassword = await bcrypt.hash(password, 10).catch(next);
    const user = new User({
      username: usernameValue,
      password: hashedPassword,
    });
    const createdUser = await user.save().catch(next);
    const { username } = createdUser;
    const { key, expirationDate } = CONFIG.JWT;
    const jwt = jsonwebtoken
      .sign({ username }, key, { expiresIn: expirationDate });
    return response.status('200').json({
      username,
      password,
      jwt,
      message: 'userCreated',
    });
  }
  return response.status(400).json({
    message: 'userSignupError',
  });
};
