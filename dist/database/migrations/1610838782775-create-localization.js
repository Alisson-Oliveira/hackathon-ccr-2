"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocalization1610833654741 = void 0;
const typeorm_1 = require("typeorm");
class createLocalization1610833654741 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'localizations',
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
                    name: 'institution',
                    type: 'varchar',
                },
                {
                    name: 'latitude',
                    type: 'float',
                },
                {
                    name: 'longitude',
                    type: 'float'
                },
                {
                    name: 'schadule',
                    type: 'varchar',
                },
                {
                    name: 'reservation_location',
                    type: 'varchar',
                },
                {
                    name: 'available',
                    type: 'boolean',
                }
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('localizations');
    }
}
exports.createLocalization1610833654741 = createLocalization1610833654741;
