const { Table } = require("typeorm");

module.exports = class CreateProductTable1777404291082 {
    async up(queryRunner) {
        await queryRunner.createTable(
            new Table({
                name: "product",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "price",
                        type: "decimal",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "image",
                        type: "varchar",
                        isNullable: true,
                    },
                    // {
                    //     name: "createdAt",
                    //     type: "timestamp",
                    //     default: "CURRENT_TIMESTAMP",
                    // },
                    // {
                    //     name: "updatedAt",
                    //     type: "timestamp",
                    //     default: "CURRENT_TIMESTAMP",
                    //     onUpdate: "CURRENT_TIMESTAMP",
                    // },
                ],
            }),
            true
        );
    }

    async down(queryRunner) {
        await queryRunner.dropTable("product");
    }
}