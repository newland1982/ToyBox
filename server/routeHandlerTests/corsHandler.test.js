const request = require('supertest');
const mongoose = require('mongoose');

const { app, server } = require('../index');

describe('Test the corsHandler', () => {
  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
  });

  test('Browser sends OPTIONS preflight request', async () => {
    await request(app).options('/')
      .expect('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
  });
});
