const { sequelize } = require('../src/config/database');

//da Setup test database before all tests
beforeAll(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); 
    console.log('Test database setup complete');
  } catch (error) {
    console.error('Test setup failed:', error);
  }
});

//da Cleanup after all tests
afterAll(async () => {
  try {
    await sequelize.close();
    console.log('Test database connection closed');
  } catch (error) {
    console.error('Test cleanup failed:', error);
  }
});

//da Set test environment
process.env.NODE_ENV = 'test';
