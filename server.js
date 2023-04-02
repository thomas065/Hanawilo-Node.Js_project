// Importing the required packages and routes
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const category = require('./routes/category');
const item = require('./routes/item');
const user = require('./routes/user');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');

// path where to read the config.env file
dotenv.config({ path: './config/config.env' });

// Connect to the database
connectDB();

// Create an express app
const app = express();

// Read json data from the request body
app.use(bodyParser.json());
app.use(fileupload());
app.use(cookieParser());

// middleware
app.use(logger);
app.use(errorHandler);

// routes
app.use('/category', category);
app.use('/item', item);
app.use('/user', user);

// Set up the port
const PORT = process.env.PORT || 5001;

// live server
const server = app.listen(PORT, () => {
    console.log(`All your Base are belong to us on PORT: ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close the server and exit process
    server.close(() => process.exit(1));
});
