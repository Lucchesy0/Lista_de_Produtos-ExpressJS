// routes/produtoRoutes.js
const express = require('express');
const { Produto } = require('../models');  // Importando o modelo Produto

const router = express.Router();

// Criar um novo produto
router.post('/', async (req, res) => {
  try {
    const { nome, preco, descricao } = req.body;
    const novoProduto = await Produto.create({
      nome,
      preco,
      descricao,
    });
    res.status(201).json(novoProduto);
  } catch (err) {
    console.error('Erro ao criar produto:', err);
    res.status(500).json({ mensagem: 'Erro ao criar produto' });
  }
});

// Listar todos os produtos
router.get('/', async (req, res) => {
    try {
      console.log('Tentando listar produtos...');
      const produtos = await Produto.findAll();
      console.log('Produtos encontrados:', produtos);
      res.status(200).json(produtos);
    } catch (err) {
      console.error('Erro ao listar produtos:', err);
      res.status(500).json({ mensagem: 'Erro ao listar produtos' });
    }
  });
  
// Obter um produto específico pelo ID
router.get('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    res.status(200).json(produto);
  } catch (err) {
    console.error('Erro ao buscar produto:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar produto' });
  }
});

// Atualizar um produto pelo ID
router.put('/:id', async (req, res) => {
  try {
    const { nome, preco, descricao } = req.body;
    const produto = await Produto.findByPk(req.params.id);
    
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    produto.nome = nome;
    produto.preco = preco;
    produto.descricao = descricao;
    await produto.save();

    res.status(200).json(produto);
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).json({ mensagem: 'Erro ao atualizar produto' });
  }
});

// Excluir um produto pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    await produto.destroy();
    res.status(200).json({ mensagem: 'Produto excluído com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir produto:', err);
    res.status(500).json({ mensagem: 'Erro ao excluir produto' });
  }
});

module.exports = router;
