const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_LINK;
const dbName = 'mydatabase';

const connectToDB = async () => {
  try {
    await mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database');
  
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
};

module.exports = connectToDB;
