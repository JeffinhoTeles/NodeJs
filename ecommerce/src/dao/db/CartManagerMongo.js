const Cart = require('../models/cart.model');

class CartManagerMongo {
    async createCart() {
        const newCart = await Cart.create({ products: [] });
        return newCart;
    }

    async getCartById(id) {
        return await Cart.findById(id).populate('products.product');
    }

    async addProductToCart(cartId, productId) {
        const cart = await Cart.findById(cartId);
        if (!cart) return null;

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex >= 0) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        return cart;
    }
}

module.exports = CartManagerMongo;