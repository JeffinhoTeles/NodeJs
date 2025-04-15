const express = require("express");
const exphbs = require("express-handlebars");
const connectDB = require("./dbConfig");
const config = require("./config");

const productsRouter = require("./routes/productsRouter");
const chatRouter = require("./routes/chatRouter");
const cartsRouter = require("./routes/cartsRouter");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

if (config.persistence === "MONGO") connectDB();

app.use("/api/products", productsRouter);
app.use("/chat", chatRouter);
app.use("/api/carts", cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
