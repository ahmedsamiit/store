require("dotenv").config();
const { AppDataSource } = require("../data-source/mysql");
const Product = require("../domain/models/Products");

const PRODUCT_NAMES = [
    "Wireless Headphones",
    "Smart Watch",
    "Gaming Keyboard",
    "Bluetooth Speaker",
    "Office Chair",
    "LED Desk Lamp",
    "Coffee Maker",
    "Backpack",
    "Running Shoes",
    "Portable SSD",
    "Noise Cancelling Earbuds",
    "Mechanical Pencil Set",
];

const randomFrom = (items) => items[Math.floor(Math.random() * items.length)];

const buildProducts = (count) => {
    const products = [];

    for (let i = 1; i <= count; i += 1) {
        const baseName = randomFrom(PRODUCT_NAMES);
        const price = (Math.random() * 180 + 20).toFixed(2);

        products.push({
            name: `${baseName} ${i}`,
            price,
            description: `${baseName} item ${i} with quality build and fast shipping.`,
            image: `https://picsum.photos/id/${i}/400/400`,
        });
    }

    return products;
};

const run = async () => {
    const count = Number(process.argv[2] || 30);

    if (!Number.isInteger(count) || count <= 0) {
        throw new Error("Count must be a positive integer. Example: npm run seed:products -- 50");
    }

    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(Product);
    const products = buildProducts(count);

    await repo.save(products);
    console.log(`Seeded ${products.length} products successfully.`);

    await AppDataSource.destroy();
};

run().catch(async (error) => {
    console.error("Failed to seed products:", error.message);
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }
    process.exit(1);
});
