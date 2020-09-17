module.exports = {
  proxy: {
    port: 3000,
  },
  dummyServer: {
    host: 'http://localhost',
    port: 3999,
  },
  jwt: {
    secret: 'dummy-secret', // should be an env var
    algorithms: ['HS256'],
  },
};
