require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const produtosRouter = require('./routes/produtosRouters');

const app = express();
app.use(express.json());

const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`;

mongoose.connect(mongoURI)
.then(() => console.log('Conectado'))
.catch((err) => console.error('Erro ao conectar: ', err));

app.use('/produtos', produtosRouter);

module.exports = app;