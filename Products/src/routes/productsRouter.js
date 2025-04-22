// src/routes/productsRouter.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../../products.json");

// Helper: ler os produtos
const readProducts = () => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Helper: salvar os produtos
const writeProducts = (products) => {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
};

// GET /api/products?limit=NUM
router.get("/", (req, res) => {
  const { limit } = req.query;
  let products = readProducts();
  if (limit) products = products.slice(0, Number(limit));
  res.json(products);
});

// GET /api/products/:pid
router.get("/:pid", (req, res) => {
  const { pid } = req.params;
  const products = readProducts();
  const product = products.find((p) => String(p.id) === pid);
  if (!product)
    return res.status(404).json({ error: "Produto não encontrado" });
  res.json(product);
});

// POST /api/products
router.post("/", (req, res) => {
  const products = readProducts();
  const newProduct = req.body;

  const requiredFields = [
    "title",
    "description",
    "code",
    "price",
    "stock",
    "category",
    "status",
  ];
  for (const field of requiredFields) {
    if (!newProduct.hasOwnProperty(field)) {
      return res
        .status(400)
        .json({ error: `Campo obrigatório ausente: ${field}` });
    }
  }

  const newId = Date.now();
  const product = { id: newId, thumbnails: [], ...newProduct };
  products.push(product);
  writeProducts(products);
  res.status(201).json(product);
});

// PUT /api/products/:pid
router.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const updates = req.body;
  const products = readProducts();
  const index = products.findIndex((p) => String(p.id) === pid);

  if (index === -1)
    return res.status(404).json({ error: "Produto não encontrado" });
  delete updates.id; // nunca atualiza o ID
  products[index] = { ...products[index], ...updates };
  writeProducts(products);
  res.json(products[index]);
});

// DELETE /api/products/:pid
router.delete("/:pid", (req, res) => {
  const { pid } = req.params;
  let products = readProducts();
  const initialLength = products.length;
  products = products.filter((p) => String(p.id) !== pid);

  if (products.length === initialLength) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  writeProducts(products);
  res.json({ message: "Produto deletado com sucesso" });
});

module.exports = router;
