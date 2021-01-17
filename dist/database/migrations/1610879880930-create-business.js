"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBusiness1610879880930 = void 0;
const typeorm_1 = require("typeorm");
class createBusiness1610879880930 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'businesses',
            columns: [
                {
                    name: '_id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'password',
                    type: 'varchar',
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('businesses');
    }
}
exports.createBusiness1610879880930 = createBusiness1610879880930;
