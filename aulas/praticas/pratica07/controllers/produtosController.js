const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

async function criar(req, res) {
  try {
    const { nome, preco } = req.body;
    const novoProduto = await Produto.create({ nome, preco });
    return res.status(201).json(novoProduto);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422).json({ msg: error.message });
    } else {
      return res.status(500).json({ msg: 'Ocorreu um erro interno.' });
    }
  }
}

async function listar(req, res) {
  try {
    const produtosCadastrados = await Produto.find({});
    return res.status(200).json(produtosCadastrados);
  } catch (error) {
    return res.status(500).json({ msg: 'Ocorreu um erro interno.' });
  }
}

async function buscar(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'inválido' });
    }

    const produtoEncontrado = await Produto.findById(id);

    if (produtoEncontrado) {
      req.produto = produtoEncontrado;
      return next();
    } else {
      return res.status(404).json({ msg: 'Produto não encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Ocorreu um erro interno.' });
  }
}

function exibir(req, res) {
  return res.status(200).json(req.produto);
}

async function atualizar(req, res) {
  const { id } = req.params;
  const { nome, preco } = req.body;

  if (nome === undefined && preco === undefined) {
    return res
      .status(422)
      .json({ msg: 'Nome e preço do produto são obrigatórios' });
  }

  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      id,
      { nome, preco },
      { runValidators: true, new: true }
    );

    return res.status(200).json(produtoAtualizado);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422).json({ msg: error.message });
    } else {
      return res
        .status(422)
        .json({ msg: 'Nome e preço do produto são obrigatórios' });
    }
  }
}

async function remover(req, res) {
  try {
    const { id } = req.params;
    await Produto.findByIdAndDelete(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ msg: 'Ocorreu um erro interno.' });
  }
}

module.exports = {criar,listar,buscar,exibir,atualizar,remover};