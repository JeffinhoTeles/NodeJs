const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://adminuser:admin123@codercluster.kdgqp4h.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=CoderCluster"
    );
    console.log("🟢 Conectado ao MongoDB Atlas");
  } catch (err) {
    console.error("🔴 Erro ao conectar no MongoDB", err);
  }
};

module.exports = connectDB;
