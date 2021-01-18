"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    /**
     * @param request
     * @param response
     * @returns todas as informações dos estudantes por aréa de atuação.
     **/
    async area(request, response) {
        try {
            const { area } = request.params;
            const users = await typeorm_1.getRepository(User_1.default)
                .createQueryBuilder('users')
                .where('users.area like :area', { area: `%${area}%` })
                .getManyAndCount();
            if (!users) {
                return response.status(401).send({ error: 'User not found.' });
            }
            return response.status(201).json(users);
        }
        catch (error) {
            console.error('Error showing students - ' + error);
            return response.status(400).json({ message: 'Error showing studens' });
        }
    },
    /**
     * @param request
     * @param response
     * @returns todas as informações dos estudantes por ordem decrescente dos seus pontos.
     **/
    async points(request, response) {
        try {
            const users = await typeorm_1.getRepository(User_1.default)
                .createQueryBuilder('courses')
                .orderBy("courses.points", "DESC")
                .getMany();
            if (!users) {
                return response.status(401).send({ error: 'User not found.' });
            }
            return response.status(201).json(users);
        }
        catch (error) {
            console.error('Error showing students - ' + error);
            return response.status(400).json({ message: 'Error showing studens' });
        }
    }
};
