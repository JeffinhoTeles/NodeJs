const socket = io();

const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const title = formData.get("title");
  const price = formData.get("price");

  const product = {
    id: Date.now().toString(),
    title,
    price,
  };

  socket.emit("addProduct", product);
  form.reset();
});

socket.on("updateProducts", (products) => {
  productList.innerHTML = "";
  products.forEach((prod) => {
    const li = document.createElement("li");
    li.innerHTML = `${prod.title} - ${prod.price} <button onclick="deleteProduct('${prod.id}')">Excluir</button>`;
    productList.appendChild(li);
  });
});

function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}
