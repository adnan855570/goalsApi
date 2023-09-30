/* This code is setting up a basic Express server in JavaScript. */
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('../middleware/errorMiddleware.js');
const connectDB = require('../config/db.js');

connectDB();

const port = process.env.PORT || 5000; // first we use the port in the env if not found then this one will be used

const app = express();

app.use(express.json()); // to get the json data
app.use(express.urlencoded({extended : false}));

app.use('/api/goals' , require('../routes/goalRoutes.js'));
app.use('/api/users' , require('../routes/userRoutes.js'));

app.use(errorHandler); // to override the defauld express error handler

app.listen(port , () => console.log(`Server running on port no ${port}`));
