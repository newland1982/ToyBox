const request = require('supertest');
const mongoose = require('mongoose');

const { app, server } = require('../../index');

describe('Test the root/rootHandler', () => {
  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
  });

  test('User sends GET request to root', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
