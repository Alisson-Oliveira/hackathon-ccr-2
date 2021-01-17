"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse1610815220834 = void 0;
const typeorm_1 = require("typeorm");
class createCourse1610815220834 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'courses',
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
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'amount',
                    type: 'integer',
                },
                {
                    name: 'hours',
                    type: 'varchar',
                },
                {
                    name: 'area',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name: 'teacher_id',
                    type: 'integer'
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('courses');
    }
}
exports.createCourse1610815220834 = createCourse1610815220834;
