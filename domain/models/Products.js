const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Product",
    tableName: "product",
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
        price: {
            type: "decimal",
            nullable: false,
        },
        description: {
            type: "text",
        },
        image: {
            type: "varchar",
            nullable: true,
        },
    },
});
    
