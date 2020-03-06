const aws = require('aws-sdk');
const jsonwebtoken = require('jsonwebtoken');
const utcDate = require('../../../functions/etcetera/utcDate');
const User = require('../../../database/User');
const CONFIG = require('../../../CONFIG/CONFIG');

module.exports = async (request, response, next) => {
  const decodedUsernameValue = request.decodedJwt.username;

  const validationResult = (decodedUsernameValue
                        && decodedUsernameValue.match(CONFIG.REGEX.username));

  if (!validationResult) {
    return response.status(400).json({
      message: 'blogOriginError',
    });
  }
  const matchedDocument = await User.findOne({ username: decodedUsernameValue })
    .exec().catch(next);
  if (!matchedDocument) {
    return response.status(401).json({
      message: 'nonexistentUser',
    });
  }

  const { username } = matchedDocument;
  const { key, expirationDate } = CONFIG.JWT;
  const jwt = jsonwebtoken
    .sign({ username }, key, { expiresIn: expirationDate });

  const responseSts = await new aws.STS(
    {
      apiVersion: '2011-06-15',
      accessKeyId: CONFIG.AWS.sts.s3.putObject.accessKeyId,
      secretAccessKey: CONFIG.AWS.sts.s3.putObject.secretAccessKey,
    },
  ).assumeRole(
    {
      RoleArn: 'arn:aws:iam::348698132829:role/sts-putObject-s3',
      RoleSessionName: 'sts-putObject-s3',
      DurationSeconds: 900,
    },
  ).promise()
    .catch(error => error.stack);

  return response.status('200').json({
    utcDate: utcDate(new Date()),
    username,
    jwt,
    accessKeyId: responseSts.Credentials.AccessKeyId,
    secretAccessKey: responseSts.Credentials.SecretAccessKey,
    sessionToken: responseSts.Credentials.SessionToken,
    message: 'fileHasBeenUploaded',
  });
};
