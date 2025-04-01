const Product = require('../models/Product');

// Função para buscar todos os produtos
const getAllProducts = async (req, res) => {
  try {
    console.log("Buscando produtos no banco..."); // Debug
    const products = await Product.findAll();
    console.log("Produtos encontrados:", products); // Debug
    res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
};

// Função para criar um novo produto
const createProduct = async (req, res) => {
  try {
    const { nome, preco, descricao } = req.body;
    const newProduct = await Product.create({ nome, preco, descricao });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro ao criar produto" });
  }
};

module.exports = { getAllProducts, createProduct };
