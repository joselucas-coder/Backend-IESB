require('dotenv').config

const {MongoClient} = require("mongodb");

const url = `mongodb+srv://aula06:15jlucas.@cluster0.n10h68u.mongodb.net/`;

const client = new MongoClient(url)

let db = null;

async function conectar() {

    try {
        if (db === null ){
            await client.connect();
            db = client.db("agenda")
        }
        console.log("Conectado ao MongoDB")
        return db
    }   catch (e){
        console.log("Erro ao conecatar ao MOngoDB", e.message)
    }
}

module.exports = conectar

