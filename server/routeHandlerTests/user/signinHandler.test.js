const request = require('supertest');
const mongoose = require('mongoose');

const User = require('../../database/User');
const CONFIG = require('../../CONFIG/CONFIG');
const { app, server } = require('../../index');

describe('Test the user/signinHandler', () => {
  beforeAll(async () => {
    await User.deleteMany({ username: /.+/ }).exec().catch();
    const user = new User({
      username: CONFIG.TEST.alreadyExistingUsername,
      password: CONFIG.TEST.alreadyExistingUserHashedPassword,
    });
    await user.save().catch();
  });

  afterAll(async () => {
    await User.deleteMany({ username: /.+/ }).exec().catch();
    await mongoose.disconnect();
    await server.close();
  });

  test('User sends correct username and correct password', async () => {
    const { alreadyExistingUsername } = CONFIG.TEST;
    const { alreadyExistingUserPassword } = CONFIG.TEST;

    const response = await request(app).post('/user/signin')
      .send({ username: alreadyExistingUsername, password: alreadyExistingUserPassword });
    expect(response.body.username).toMatch(alreadyExistingUsername);
    expect(response.body.jwt).toMatch(CONFIG.REGEX.jwt);
    expect(response.body.message).toBe('authSuccessful');
  });

  test('User sends correct username and invalid password', async () => {
    const { alreadyExistingUsername } = CONFIG.TEST;
    const { invalidPassword } = CONFIG.TEST;

    const response = await request(app).post('/user/signin')
      .send({ username: alreadyExistingUsername, password: invalidPassword });
    expect(response.body.message).toBe('userSigninError');
  });

  test('User sends correct username and nonexistent password', async () => {
    const { alreadyExistingUsername } = CONFIG.TEST;
    const { nonexistentPassword } = CONFIG.TEST;

    const response = await request(app).post('/user/signin')
      .send({ username: alreadyExistingUsername, password: nonexistentPassword });
    expect(response.body.message).toBe('userSigninError');
  });

  test('User sends invalid username and correct password', async () => {
    const { invalidUsername } = CONFIG.TEST;
    const { alreadyExistingUserPassword } = CONFIG.TEST;

    const response = await request(app).post('/user/signin')
      .send({ username: invalidUsername, password: alreadyExistingUserPassword });
    expect(response.body.message).toBe('userSigninError');
  });

  test('User sends nonexistent username and correct password', async () => {
    const { nonexistentUsername } = CONFIG.TEST;
    const { alreadyExistingUserPassword } = CONFIG.TEST;

    const response = await request(app).post('/user/signin')
      .send({ username: nonexistentUsername, password: alreadyExistingUserPassword });
    expect(response.body.message).toBe('nonexistentUser');
  });
});
