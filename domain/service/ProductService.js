const ProductRepository = require("../repository/ProductRepository");

module.exports = {
    getAllProducts: async () => {
        return await ProductRepository.findAll();
    },
    getProductById: async (id) => {
        return await ProductRepository.findById(id);
    },
    createProduct: async (productData) => {
        return await ProductRepository.save(productData);
    },
    deleteProduct: async (id) => {
        return await ProductRepository.delete(id);
    },
    updateProduct: async (id, productData) => {
        return await ProductRepository.update(id, productData);
    }
};