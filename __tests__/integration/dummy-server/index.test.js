const supertest = require('supertest');

const { __TEST__ } = require('../../../src/dummy-server');

describe('Dummy server test suite', () => {
  const app = __TEST__.app;
  it('should respond hello world', async () => {
    const { status, text } = await supertest(app).get('/');

    expect(status).toEqual(200);
    expect(text).toEqual('Hello World!');
  });
});
