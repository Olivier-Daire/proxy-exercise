const db = require('../index.js');

const TABLE_NAME = 'Logs';

/**
 * Create the Logs table
 */
async function update() {
  const dbInstance = await db.initDatabase();

  try {
    const creationQuery = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
    logId INTEGER PRIMARY KEY,
    ip TEXT,
    path TEXT,
    subject TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP 
  )`;

    await dbInstance.run(creationQuery);

    const updatedAtTrigger = `CREATE TRIGGER IF NOT EXISTS updatedAt UPDATE OF logId, ip, path, subject ON ${TABLE_NAME}
    BEGIN
      UPDATE ${TABLE_NAME} SET updatedAt=CURRENT_TIMESTAMP WHERE logId=old.logId;
    END;`;
    await dbInstance.run(updatedAtTrigger);
  } catch (err) {
    console.error('An error occured during table creation', err);
  }
}

/**
 * Rollback the Logs table creation (by dropping it)
 */
async function rollback() {
  const dbInstance = await db.initDatabase();
  try {
    const dropQuery = `DROP TABLE IF EXISTS ${TABLE_NAME}`;
    await dbInstance.run(dropQuery);
  } catch (err) {
    console.error('An error occured during table creation', err);
  }
}

if (!module.parent) {
  update().then(() => console.log(`${TABLE_NAME} table created successfully`));
} else {
  module.exports = {
    update,
    rollback,
  };
}
