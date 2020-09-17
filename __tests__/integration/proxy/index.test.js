const supertest = require('supertest');
const nock = require('nock');

const { __TEST__ } = require('../../../src/proxy');
const { adminToken } = require('../../fixtures/token');

describe('Proxy server test suite', () => {
  const app = __TEST__.app;

  it.only('should forward the request to the dummy server', async () => {
    const dummyServerNock = nock('http://localhost:3999')
      .get(`/`)
      .reply(200, 'Dummy server answer');
    const { status, text } = await supertest(app)
      .get('/')
      .set('Authorization', adminToken);

    expect(dummyServerNock.isDone()).toBe(true);
    expect(status).toEqual(200);
    expect(text).toEqual('Dummy server answer');
  });

  it('should return the error status when dummy server fails', async () => {
    const dummyServerNock = nock('http://localhost:3999')
      .get(`/`)
      .reply(404, { error: 'Not found' });
    const { status, body } = await supertest(app)
      .get('/')
      .set('Authorization', adminToken);

    expect(dummyServerNock.isDone()).toBe(true);
    expect(status).toEqual(404);
    expect(body).toEqual({ error: 'Not found' });
  });

  ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc19hZG1pbiI6dHJ1ZSwiaWF0IjoxNjAwMzQ2MjMzfQ.D5HjxOkW8YbU--Zr9HHs0S0fzVwl432HqbMf_fkBkyQ');
  it('should return a 403 if user is not authenticated', async () => {
    const dummyServerNock = nock('http://localhost:3999')
      .get(`/`)
      .reply(200, 'Dummy server answer');

    const { status, body } = await supertest(app)
      .get('/')
      .set('Authorization', '');

    expect(dummyServerNock.isDone()).toBe(true);
    expect(status).toEqual(403);
    expect(body).toEqual({});
  });
});
