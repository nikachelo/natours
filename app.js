/* eslint-disable prettier/prettier */
/* eslint-disable node/no-deprecated-api */
const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
