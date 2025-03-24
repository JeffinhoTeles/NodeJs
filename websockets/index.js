const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");
const path = require("path");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Configurar Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middleware para arquivos estáticos e JSON
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simula um banco de dados
let products = [];

// Rota principal
app.get("/", (req, res) => {
  res.render("home", { products });
});

// Rota com websocket ativo
app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", { products });
});

// Websockets
io.on("connection", (socket) => {
  console.log("Cliente conectado via Socket.io");
  socket.emit("updateProducts", products);

  socket.on("addProduct", (product) => {
    products.push(product);
    io.emit("updateProducts", products);
  });

  socket.on("deleteProduct", (id) => {
    products = products.filter((prod) => prod.id !== id);
    io.emit("updateProducts", products);
  });
});

const PORT = 3000;
httpServer.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
