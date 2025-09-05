// 1. Importar o framework
const express = require("express");

// .2 Criar uma instancia da aplicação
const app = express();

// Criar um middleware
app.get('/', (req, res) => {
    res.send("Olá");
});

// 3. Iniciar aplicação
app.listen(3000, () => {
    console.log("App está on!")
})