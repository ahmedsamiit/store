require("dotenv").config();
const { AppDataSource } = require("../data-source/mysql");
const Product = require("../domain/models/Products");

const run = async () => {
    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(Product);

    const result = await repo.clear();
    console.log("All products were deleted successfully.", result ?? "");

    await AppDataSource.destroy();
};

run().catch(async (error) => {
    console.error("Failed to clear products:", error.message);
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }
    process.exit(1);
});
