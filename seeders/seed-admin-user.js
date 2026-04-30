require("dotenv").config();
const { AppDataSource } = require("../data-source/mysql");
const User = require("../domain/models/Users");
const bcrypt = require("bcryptjs");

const run = async () => {
    await AppDataSource.initialize();
    const repo = AppDataSource.getRepository(User);

    const existingAdmin = await repo.findOneBy({ role: "admin" });

    if (existingAdmin) {
        console.log(`Admin user already exists: ${existingAdmin.email}`);
        await AppDataSource.destroy();
        return;
    }

    const adminUser = repo.create({
        name: process.env.ADMIN_NAME || "Admin",
        email: process.env.ADMIN_EMAIL || "admin@admin.com",
        password: await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10),
        role: "admin",
        isActive: true,
    });

    await repo.save(adminUser);
    console.log(`Admin user created successfully: ${adminUser.email}`);

    await AppDataSource.destroy();
};

run().catch(async (error) => {
    console.error("Failed to seed admin user:", error.message);
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }
    process.exit(1);
});
