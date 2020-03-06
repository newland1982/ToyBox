const request = require('supertest');
const mongoose = require('mongoose');

const User = require('../../database/User');
const CONFIG = require('../../CONFIG/CONFIG');
const { app, server } = require('../../index');

describe('Test the user/withdrawalHandler', () => {
  beforeAll(async () => {
    await User.deleteMany({ username: /.+/ }).exec().catch();
  });

  beforeEach(async () => {
    const user = new User({
      username: CONFIG.TEST.alreadyExistingUsername,
      password: CONFIG.TEST.alreadyExistingUserHashedPassword,
    });
    await user.save().catch();
  });

  afterEach(async () => {
    await User.deleteMany({ username: /.+/ }).exec().catch();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
  });

  test('User sends correct jwt', async () => {
    const { alreadyExistingUserJwt } = CONFIG.TEST;

    const response = await request(app).delete('/user/withdrawal')
      .set('Authorization', `Bearer ${alreadyExistingUserJwt}`);
    expect(response.body.message).toBe('userHasBeenDeleted');
  });

  test('User sends the illegitimate jwt encoding an invalid username', async () => {
    const response = await request(app).delete('/user/withdrawal')
      .set('Authorization', `Bearer ${CONFIG.TEST.invalidUsernameEncodedJwt}`);
    expect(response.body.message).toBe('userWithdrawalError');
  });

  test('User sends jwt encoding the non-existent username', async () => {
    await User.findOneAndDelete({ username: CONFIG.TEST.alreadyExistingUsername }).exec().catch();

    const response = await request(app).delete('/user/withdrawal')
      .set('Authorization', `Bearer ${CONFIG.TEST.alreadyExistingUserJwt}`);
    expect(response.body.message).toBe('userDoesNotExist');
  });
});
