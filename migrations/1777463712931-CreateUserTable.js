const { Table } = require("typeorm");

module.exports = class CreateUserTable1777463712931 {
    async up(queryRunner) {
        await queryRunner.createTable(
            new Table({
                name: "user",
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
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "role",
                        type: "enum",
                        enum: ["admin", "Seller", "customer"],
                        isNullable: false,
                        default: "'customer'",
                    },
                    {
                        name: "isActive",
                        type: "boolean",
                        default: true,
                    },
                ],
            }),
            true
        );
    }

    async down(queryRunner) {
        await queryRunner.dropTable("user");
    }
}