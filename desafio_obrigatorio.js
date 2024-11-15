class ProductManager {
  constructor() {
    this.products = []; // Inicializa com um array vazio
    this.nextId = 1; // Para o ID de incremento automático
  }

  // Método para adicionar um produto
  addProduct({ title, description, price, thumbnail, code, stock }) {
    // Verifica se todos os campos obrigatórios estão presentes
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos os campos são obrigatórios.");
      return;
    }

    // Verifica se o código é único
    const codeExists = this.products.some((product) => product.code === code);
    if (codeExists) {
      console.error(`O código '${code}' já existe.`);
      return;
    }

    // Adiciona o produto ao array com ID de incremento automático
    const newProduct = {
      id: this.nextId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(newProduct);
  }

  // Método para buscar um produto pelo ID
  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.error("Não encontrado");
      return null; // Retorna null
    }
    return product;
  }
}

// Exemplo de uso:
const manager = new ProductManager();

// Adicionando produtos
manager.addProduct({
  title: "Produto 1",
  description: "Descrição do Produto 1",
  price: 100,
  thumbnail: "/path/to/image1.jpg",
  code: "ABC123",
  stock: 10,
});

manager.addProduct({
  title: "Produto 2",
  description: "Descrição do Produto 2",
  price: 200,
  thumbnail: "/path/to/image2.jpg",
  code: "DEF456",
  stock: 5,
});

// Tentativa de adicionar um produto com código duplicado
manager.addProduct({
  title: "Produto 3",
  description: "Descrição do Produto 3",
  price: 150,
  thumbnail: "/path/to/image3.jpg",
  code: "ABC123", // Código duplicado
  stock: 8,
});

// Buscando produtos por ID
console.log(manager.getProductById(1)); // Retorna o produto com ID 1
console.log(manager.getProductById(3)); // Exibe "Não encontrado" no console
