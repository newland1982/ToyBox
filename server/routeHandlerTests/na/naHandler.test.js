const request = require('supertest');
const mongoose = require('mongoose');

const { app, server } = require('../../index');

describe('Test the na/naHandler', () => {
  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
  });

  test('User sends GET request to not applicable route', async () => {
    const response = await request(app).get('/foo');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('notFound');
  });
});
