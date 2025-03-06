const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const port = 8080;
const productManager = new ProductManager("products.json");

// Endpoint para listar produtos (com limite opcional)
app.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = await productManager.getProducts(limit);
  res.json(products);
});

// Endpoint para buscar um produto pelo ID
app.get("/products/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = await productManager.getProductById(productId);

  if (!product) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  res.json(product);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
