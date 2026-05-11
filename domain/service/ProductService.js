const ProductRepository = require("../repository/ProductRepository");

module.exports = {
    getAllProducts: async () => {
        return await ProductRepository.findAll();
    },
    getPaginatedProducts: async ({ page = 1, limit = 15 }) => {
        const currentPage = Math.max(Number(page) || 1, 1);
        const perPage = Math.min(Math.max(Number(limit) || 15, 1), 48);
        const skip = (currentPage - 1) * perPage;
        const [products, totalProducts] = await ProductRepository.findPaginated({
            skip,
            take: perPage,
        });
        const totalPages = Math.max(Math.ceil(totalProducts / perPage), 1);

        return {
            products,
            pagination: {
                currentPage,
                perPage,
                totalProducts,
                totalPages,
                hasPreviousPage: currentPage > 1,
                hasNextPage: currentPage < totalPages,
                previousPage: currentPage - 1,
                nextPage: currentPage + 1,
                pages: Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;

                    return {
                        number: pageNumber,
                        isCurrent: pageNumber === currentPage,
                    };
                }),
            },
        };
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