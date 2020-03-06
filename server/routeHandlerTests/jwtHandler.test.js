const request = require('supertest');
const mongoose = require('mongoose');

const User = require('../database/User');
const CONFIG = require('../CONFIG/CONFIG');
const { app, server } = require('../index');

describe('Test the jwtHandler', () => {
  beforeAll(async () => {
    await User.deleteMany({ username: /.+/ }).exec().catch();
    const generalUser = new User({
      _id: CONFIG.TEST.alreadyExistingUserId,
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

  test('User sends incorrect jwt', async () => {
    const response = await request(app).patch('/user/passwordchange')
      .set('Authorization', `Bearer ${CONFIG.TEST.incorrectJwt}`);
    expect(response.body.message).toBe('authJwtError');
  });

  test('User sends expired jwt', async () => {
    const response = await request(app).patch('/user/passwordchange')
      .set('Authorization', `Bearer ${CONFIG.TEST.expiredJwt}`);
    expect(response.body.message).toBe('authJwtError');
  });

  test('User sends no jwt', async () => {
    const response = await request(app).patch('/user/passwordchange');
    expect(response.body.message).toBe('noJwt');
  });
});
