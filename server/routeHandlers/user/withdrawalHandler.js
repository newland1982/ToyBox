const User = require('../../database/User');
const CONFIG = require('../../CONFIG/CONFIG');

module.exports = async (request, response, next) => {
  const decodedUsernameValue = request.decodedJwt.username;

  const validationResult = (decodedUsernameValue
                        && decodedUsernameValue.match(CONFIG.REGEX.username));

  if (!validationResult) {
    return response.status(400).json({
      message: 'userWithdrawalError',
    });
  }
  const matchedUserDocument = await User.findOne({ username: decodedUsernameValue })
    .exec().catch(next);

  if (!matchedUserDocument) {
    return response.status(404).json({
      message: 'userDoesNotExist',
    });
  }
  await User.findOneAndDelete({ username: decodedUsernameValue }).exec().catch(next);
  return response.status(200).json({
    message: 'userHasBeenDeleted',
  });
};
