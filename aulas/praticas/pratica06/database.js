const {MongoClient} = require("mongodb");

const url = "mongodb+srv://aula06:15jlucas.@cluster0.n10h68u.mongodb.net/";
const client = new MongoClient(url);

async function conectarDb() {
  await client.connect();
  return client.db("agenda");
}

module.exports = conectarDb;
