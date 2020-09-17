const { setupProxy } = require('./proxy');
const { setupDummyServer } = require('./dummy-server');

setupProxy();
setupDummyServer();
