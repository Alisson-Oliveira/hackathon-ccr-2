"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeacher1610816298642 = void 0;
const typeorm_1 = require("typeorm");
class createTeacher1610816298642 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'teachers',
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
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('teachers');
    }
}
exports.createTeacher1610816298642 = createTeacher1610816298642;
