const Product = require("../models/Products");
const { AppDataSource } = require("../../data-source/mysql");

const getProductRepository = () => AppDataSource.getRepository(Product);

 module.exports = {
    findAll: async () => {
        return await getProductRepository().find();
    },
    findById: async (id) => {
        return await getProductRepository().findOneBy({ id });
    },
    save: async (productData) => {
        const productRepository = getProductRepository();
        const product = productRepository.create(productData);
        return await productRepository.save(product);
    },
    delete: async (id) => {
        return await getProductRepository().delete(id);
    },
    update: async (id, productData) => {
        return await getProductRepository().update(id, productData);
    }
};