const Product = require('../models/product.model');

class ProductManagerMongo {
    async getAll(limit) {
        const products = await Product.find();
        return limit ? products.slice(0, limit) : products;
    }

    async getById(id) {
        return await Product.findById(id);
    }

    async create(data) {
        return await Product.create(data);
    }

    async update(id, data) {
        return await Product.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = ProductManagerMongo;