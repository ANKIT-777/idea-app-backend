const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = 3000;

connectDB();


app.use(express.json());



app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
