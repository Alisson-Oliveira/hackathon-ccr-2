"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReserv1610882706796 = void 0;
const typeorm_1 = require("typeorm");
class createReserv1610882706796 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'reserves',
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
                    name: 'localization_id',
                    type: 'integer',
                },
                {
                    name: 'user_id',
                    type: 'integer',
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('reserves');
    }
}
exports.createReserv1610882706796 = createReserv1610882706796;
