const request = require('supertest');
const mongoose = require('mongoose');

const User = require('../../database/User');
const CONFIG = require('../../CONFIG/CONFIG');
const { app, server } = require('../../index');

describe('Test the user/signupHandler', () => {
  beforeAll(async () => {
    await User.deleteMany({ username: /.+/ }).exec().catch();
    const user = new User({
      username: CONFIG.TEST.alreadyExistingUsername,
      password: CONFIG.TEST.alreadyExistingUserHashedPassword,
    });
    await user.save().catch();
  });

  beforeEach(async () => {
    await User.deleteOne({ username: CONFIG.TEST.validUsername }).exec().catch();
  });

  afterAll(async () => {
    await User.deleteMany({ username: /.+/ }).exec().catch();
    await mongoose.disconnect();
    await server.close();
  });

  test('User inputs already existing username', async () => {
    const response = await request(app).post('/user/signup')
      .send({ username: CONFIG.TEST.alreadyExistingUsername, triger: 'input' });
    expect(response.body.message).toBe('alreadyExists');
  });

  test('User inputs valid new username', async () => {
    const response = await request(app).post('/user/signup')
      .send({ username: CONFIG.TEST.validUsername, triger: 'input' });
    expect(response.body.message).toBe('validNewUsername');
  });

  test('User sends invalid username with { triger: "input" }', async () => {
    const response = await request(app).post('/user/signup')
      .send({ username: CONFIG.TEST.invalidUsername, triger: 'input' });
    expect(response.body.message).toBe('userSignupError');
  });

  test('User sends already existing username with { triger: "submitButton" }', async () => {
    const response = await request(app).post('/user/signup')
      .send({ username: CONFIG.TEST.alreadyExistingUsername, triger: 'submitButton' });
    expect(response.body.message).toBe('userSignupError');
  });

  test('User sends valid new username by submit button', async () => {
    const response = await request(app).post('/user/signup')
      .send({ username: CONFIG.TEST.validUsername, triger: 'submitButton' });
    expect(response.body.username).toMatch(CONFIG.TEST.validUsername);
    expect(response.body.password).toMatch(CONFIG.REGEX.password);
    expect(response.body.jwt).toMatch(CONFIG.REGEX.jwt);
    expect(response.body.message).toBe('userCreated');
  });

  test('User sends invalid username by submit button', async () => {
    const response = await request(app).post('/user/signup')
      .send({ username: CONFIG.TEST.invalidUsername, triger: 'submitButton' });
    expect(response.body.message).toBe('userSignupError');
  });
});
