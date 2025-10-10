var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var tarefaRouter = require('./routes/tarefaRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/tarefas', tarefaRouter);

module.exports = app;

