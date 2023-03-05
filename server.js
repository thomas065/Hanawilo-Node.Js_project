// Importing the required packages and routes
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const category = require('./routes/category');

// path where to read the config.env file
dotenv.config({ path: './config/config.env' });

// Create an express app
const app = express();

// Read json data from the request body
app.use(bodyParser.json());

app.use('/category', category);

// Set up the port
const PORT = process.env.PORT || 5001;

// live server
const server = app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});

