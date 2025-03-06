const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async _readFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return []; // Se o arquivo não existir, retorna um array vazio
    }
  }

  async getProducts(limit) {
    const products = await this._readFile();
    return limit ? products.slice(0, limit) : products;
  }

  async getProductById(id) {
    const products = await this._readFile();
    const product = products.find((product) => product.id === id);
    return product || null;
  }
}

module.exports = ProductManager;
