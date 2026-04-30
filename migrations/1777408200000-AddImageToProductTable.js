const { TableColumn } = require("typeorm");

module.exports = class AddImageToProductTable1777408200000 {
    async up(queryRunner) {
        const hasImageColumn = await queryRunner.hasColumn("product", "image");

        if (!hasImageColumn) {
            await queryRunner.addColumn(
                "product",
                new TableColumn({
                    name: "image",
                    type: "varchar",
                    isNullable: true,
                })
            );
        }
    }

    async down(queryRunner) {
        const hasImageColumn = await queryRunner.hasColumn("product", "image");

        if (hasImageColumn) {
            await queryRunner.dropColumn("product", "image");
        }
    }
};
