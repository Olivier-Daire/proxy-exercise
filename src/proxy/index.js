const {
  proxy: proxyConfig,
  jwt: jwtConfig,
  dummyServer,
} = require('../config');
const jwt = require('express-jwt');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.all(
  '/*',
  createProxyMiddleware({
    target: `${dummyServer.host}:${dummyServer.port}`,
    changeOrigin: true,
  }),
);
app.use(jwt({ secret: jwtConfig.secret, algorithms: jwtConfig.algorithms }));

/**
 * Setup Proxy server
 */
function setupProxy() {
  app.listen(proxyConfig.port, () => {
    console.log(`Proxy listening at http://localhost:${proxyConfig.port}`);
  });
}

module.exports = { setupProxy, __TEST__: { app } };
