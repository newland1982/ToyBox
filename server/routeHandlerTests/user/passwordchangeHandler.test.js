const request = require('supertest');
const mongoose = require('mongoose');

const User = require('../../database/User');
const CONFIG = require('../../CONFIG/CONFIG');
const { app, server } = require('../../index');

describe('Test the user/passwordchangeHandler', () => {
  beforeAll(async () => {
    await User.deleteMany({ username: /.+/ }).exec().catch();
    const generalUser = new User({
      username: CONFIG.TEST.alreadyExistingUsername,
      password: CONFIG.TEST.alreadyExistingUserHashedPassword,
    });
    await generalUser.save().catch();
  });

  afterAll(async () => {
    await User.deleteMany({ username: /.+/ }).exec().catch();
    await mongoose.disconnect();
    await server.close();
  });

  test('User sends correct jwt', async () => {
    const response = await request(app).patch('/user/passwordchange')
      .set('Authorization', `Bearer ${CONFIG.TEST.alreadyExistingUserJwt}`);
    expect(response.body.username).toMatch(CONFIG.TEST.alreadyExistingUsername);
    expect(response.body.password).toMatch(CONFIG.REGEX.password);
    expect(response.body.jwt).toMatch(CONFIG.REGEX.jwt);
    expect(response.body.message).toBe('passwordHasBeenChanged');
  });

  test('User sends the illegitimate jwt encoding an invalid username', async () => {
    const response = await request(app).patch('/user/passwordchange')
      .set('Authorization', `Bearer ${CONFIG.TEST.invalidUsernameEncodedJwt}`);
    expect(response.body.message).toBe('passwordChangeError');
  });

  test('User sends jwt encoding the non-existent username', async () => {
    await User.deleteOne({ username: CONFIG.TEST.alreadyExistingUsername }).exec().catch();

    const response = await request(app).patch('/user/passwordchange')
      .set('Authorization', `Bearer ${CONFIG.TEST.alreadyExistingUserJwt}`);
    expect(response.body.message).toBe('nonexistentUser');
  });
});
