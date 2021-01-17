"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser1610777249160 = void 0;
const typeorm_1 = require("typeorm");
class createUser1610777249160 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
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
                    type: 'varchar'
                },
                {
                    name: 'area',
                    type: 'varchar',
                },
                {
                    name: 'points',
                    type: 'float'
                }
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.createUser1610777249160 = createUser1610777249160;
