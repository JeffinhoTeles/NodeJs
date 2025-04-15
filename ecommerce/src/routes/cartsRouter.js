const express = require("express");
const CartManager = require("../dao/db/CartManagerMongo");
const router = express.Router();

const cartManager = new CartManager();

// POST /api/carts → cria um carrinho vazio
router.post("/", async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

// GET /api/carts/:cid → busca carrinho por ID
router.get("/:cid", async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  if (!cart) return res.status(404).json({ error: "Carrinho não encontrado" });
  res.json(cart);
});

// POST /api/carts/:cid/product/:pid → adiciona produto ao carrinho
router.post("/:cid/product/:pid", async (req, res) => {
  const updatedCart = await cartManager.addProductToCart(
    req.params.cid,
    req.params.pid
  );
  if (!updatedCart)
    return res.status(404).json({ error: "Carrinho não encontrado" });
  res.json(updatedCart);
});

module.exports = router;
