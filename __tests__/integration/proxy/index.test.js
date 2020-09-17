const supertest = require('supertest');
const nock = require('nock');

const { __TEST__ } = require('../../../src/proxy');

describe('Proxy server test suite', () => {
  const app = __TEST__.app;

  it('should forward the request to the dummy server', async () => {
    const dummyServerNock = nock('http://localhost:3999')
      .get(`/`)
      .reply(200, 'Dummy server answer');
    const { status, text } = await supertest(app).get('/');

    expect(dummyServerNock.isDone()).toBe(true);
    expect(status).toEqual(200);
    expect(text).toEqual('Dummy server answer');
  });

  it('should return the error status when dummy server fails', async () => {
    const dummyServerNock = nock('http://localhost:3999')
      .get(`/`)
      .reply(404, { error: 'Not found' });
    const { status, body } = await supertest(app).get('/');

    expect(dummyServerNock.isDone()).toBe(true);
    expect(status).toEqual(404);
    expect(body).toEqual({ error: 'Not found' });
  });
});
