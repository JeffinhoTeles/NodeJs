// src/routes/cartsRouter.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const cartsFile = path.join(__dirname, "../../carrito.json");

const readCarts = () => {
  if (!fs.existsSync(cartsFile)) return [];
  const data = fs.readFileSync(cartsFile);
  return JSON.parse(data);
};

const writeCarts = (carts) => {
  fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));
};

// POST /api/carts/ -> cria novo carrinho
router.post("/", (req, res) => {
  const carts = readCarts();
  const newCart = {
    id: Date.now(),
    products: [],
  };
  carts.push(newCart);
  writeCarts(carts);
  res.status(201).json(newCart);
});

// GET /api/carts/:cid -> produtos do carrinho
router.get("/:cid", (req, res) => {
  const { cid } = req.params;
  const carts = readCarts();
  const cart = carts.find((c) => String(c.id) === cid);
  if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });
  res.json(cart.products);
});

// POST /api/carts/:cid/product/:pid -> adicionar produto
router.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  const carts = readCarts();
  const cartIndex = carts.findIndex((c) => String(c.id) === cid);

  if (cartIndex === -1)
    return res.status(404).json({ error: "Carrinho não encontrado" });

  const cart = carts[cartIndex];
  const existingProduct = cart.products.find((p) => String(p.product) === pid);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  carts[cartIndex] = cart;
  writeCarts(carts);
  res.status(200).json(cart);
});

// PUT /api/carts/:cid/product/:pid -> atualizar quantidade
router.put("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  if (!quantity || quantity < 1)
    return res.status(400).json({ error: "Quantidade inválida" });

  const carts = readCarts();
  const cart = carts.find((c) => String(c.id) === cid);
  if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });

  const product = cart.products.find((p) => String(p.product) === pid);
  if (!product)
    return res
      .status(404)
      .json({ error: "Produto não encontrado no carrinho" });

  product.quantity = quantity;
  writeCarts(carts);
  res.json(cart);
});

// DELETE /api/carts/:cid/product/:pid -> remover produto do carrinho
router.delete("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  const carts = readCarts();
  const cart = carts.find((c) => String(c.id) === cid);
  if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });

  const before = cart.products.length;
  cart.products = cart.products.filter((p) => String(p.product) !== pid);

  if (before === cart.products.length) {
    return res
      .status(404)
      .json({ error: "Produto não encontrado no carrinho" });
  }

  writeCarts(carts);
  res.json({ message: "Produto removido com sucesso" });
});

// DELETE /api/carts/:cid -> esvaziar carrinho
router.delete("/:cid", (req, res) => {
  const { cid } = req.params;
  const carts = readCarts();
  const cart = carts.find((c) => String(c.id) === cid);
  if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });

  cart.products = [];
  writeCarts(carts);
  res.json({ message: "Carrinho esvaziado com sucesso" });
});

module.exports = router;
