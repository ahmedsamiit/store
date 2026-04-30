const { DataSource } = require("typeorm");
require("dotenv").config();

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "rootpass",
    database: process.env.DB_DATABASE || "app",
    synchronize: true, // Only for development!
    logging: false,
    entities: [__dirname + "/../domain/models/*.js", __dirname + "/../models/*.js"], // Adjust this to your models path
    migrations: [__dirname + "/../migrations/*.js"],
    subscribers: [],
});

module.exports = { AppDataSource };
