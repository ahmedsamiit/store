const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "User",
    tableName: "user",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
            nullable: false,
        },
        email: {
            type: "varchar",
            nullable: false,
        },
        password: {
            type: "varchar",
            nullable: false,
        },
        role: {
            type: "enum",
            enum: ["admin", "Seller", "customer"],
            nullable: false,
            default: "customer",
        },
        isActive: {
            type: "boolean",
            default: true,
        },
    },
});