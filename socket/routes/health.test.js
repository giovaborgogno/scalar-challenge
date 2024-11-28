const request = require('supertest');
const express = require("express");
const healthRouter = require('./health');
const fs = require('fs').promises;

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

const app = express();
app.use("/health", healthRouter);

describe('GET /health', () => {
  it('should return 200 and the version', async () => {
    fs.readFile.mockResolvedValue("1.2.3");

    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ version: '1.2.3' });
  });

  it('should return 500 if there is an error reading the file', async () => {
    fs.readFile.mockRejectedValue(new Error('File read error'));

    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({ error: 'something went wrong' });
  });
});
