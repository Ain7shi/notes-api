const { sequelize } = require('../src/config/database');
const { seedNotes } = require('../src/utils/seedData');

const runSeed = async () => {
  try {
    console.log('🔄 Starting database seed process...');

    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    // Sync database (create tables)
    await sequelize.sync({ force: true });
    console.log('✅ Database tables synchronized');

    // Insert sample data
    await seedNotes();
    console.log('🎉 Sample data inserted successfully!');

    console.log('\n📊 Your Notes API is ready with sample data!');
    console.log('🌐 Visit http://localhost:3000/api/notes to see your notes');
    console.log('📖 Visit http://localhost:3000/api-docs for API documentation');

    process.exit(0);
  } catch (error) {
    console.error('💥 Seed process failed:', error.message);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  runSeed();
}

module.exports = runSeed;