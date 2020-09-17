const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let db;

const initDatabase = async (name = 'shine.db') => {
  if (db) {
    return db;
  }
  db = await open({
    filename: name,
    driver: sqlite3.Database,
  });
  return db;
};

module.exports = {
  initDatabase,
  db,
};
