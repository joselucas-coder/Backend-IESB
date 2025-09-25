const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

const tarefas = [];

app.get('/tarefas', (req, res) => {
    res.json(tarefas);
})

app.post("/tarefas", (req, res) => {
    const novatarefa => {
        id: tarefas.length + 1,
        nome: req.body.nome,
        concluida:false,
    }   

    tarefas.push(novatarefa)
    res.status(201).json(novatarefa)
})

app.p("/tarefas", (req, res) => {
    res.status(201).json({});
})



module.exports = app;




