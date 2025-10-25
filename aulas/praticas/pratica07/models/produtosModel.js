const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  preco: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Produto', schema);