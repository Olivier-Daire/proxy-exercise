const {
  update,
  rollback,
} = require('../../../../src/database/migrations/create_logs_table');
const db = require('../../../../src/database/index.js');

describe('Create logs table', () => {
  let dbInstance;
  const TEST_DB_NAME = 'shine_test.db';
  const TABLE_NAME = 'Logs';

  beforeAll(async () => {
    dbInstance = await db.initDatabase(TEST_DB_NAME);
  });

  describe('update', () => {
    it('should create logs table', async () => {
      await update();

      const exists = await dbInstance.get(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='${TABLE_NAME}'`,
      );
      expect(exists).not.toBeNull();
    });
  });

  describe('rollback', () => {
    beforeEach(async () => {
      await update();
    });
    it('should delete logs table', async () => {
      await rollback();
      const exists = await dbInstance.get(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='${TABLE_NAME}'`,
      );
      expect(exists).toBeUndefined();
    });
  });
});
