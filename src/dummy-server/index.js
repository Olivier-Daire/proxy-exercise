const { dummyServer } = require('../config');
const express = require('express');
const app = express();

app.all('/*', (req, res) => {
  console.log('Request received on dummy server', req.path);
  res.send('Hello World!');
});

/**
 * Setup dummy server
 *
 * @returns Express app
 */
function setupDummyServer() {
  app.listen(dummyServer.port, () => {
    console.log(
      `Dummy server listening at http://localhost:${dummyServer.port}`,
    );
  });
}

module.exports = { setupDummyServer, __TEST__: { app } };
