const mongoose = require('mongoose');

const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: 'task',
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

module.exports = connectDB;