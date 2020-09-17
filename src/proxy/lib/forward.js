const { dummyServer } = require('../../config');
const superagent = require('superagent');

async function forwardRequest(req, res) {
  // TODO check auth
  // TODO add new token

  const originalUrl = req.originalUrl;
  const method = req.method;
  const body = req.body;

  const forwardPath = `${dummyServer.host}:${dummyServer.port}${originalUrl}`;
  try {
    const forwardedRequest = await superagent(method, forwardPath)
      .send(body)
      .set('Authorization', 'TODO');

    res.status(forwardedRequest.status).send(forwardedRequest.text);
  } catch (error) {
    res.status(error.status).send(error.response.body);
  }

  // TODO store logs
}

module.exports = forwardRequest;
