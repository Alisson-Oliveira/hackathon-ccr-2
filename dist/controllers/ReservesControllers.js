"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Reserv_1 = __importDefault(require("../models/Reserv"));
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    async index(request, response) {
        try {
            const { id } = request.params;
            const reserves = await typeorm_1.getRepository(Reserv_1.default)
                .createQueryBuilder('reserves')
                .where('reserves.user_id = :id', { id: id })
                .getMany();
            return response.status(200).json(reserves);
        }
        catch (error) {
            console.error('Error showing reserves - ' + error);
            return response.status(400).json({ message: 'Error showing reserves' });
        }
    },
    async show(request, response) {
        try {
            const reserves = await typeorm_1.getRepository(Reserv_1.default)
                .createQueryBuilder('reserves')
                .getMany();
            return response.status(200).json(reserves);
        }
        catch (error) {
            console.error('Error showing reserves - ' + error);
            return response.status(400).json({ message: 'Error showing reserves' });
        }
    },
    async create(request, response) {
        try {
            const { localization_id, user_id } = request.body;
            const resevRepository = typeorm_1.getRepository(Reserv_1.default);
            const user = await typeorm_1.getRepository(User_1.default).findOne({
                where: { _id: user_id }
            });
            if (!user) {
                return response.status(401).json({ message: 'User Not Found' });
            }
            const data = {
                localization_id,
                user_id: user._id
            };
            const reserv = resevRepository.create(data);
            await resevRepository.save(reserv);
            return response.status(201).json(reserv);
        }
        catch (error) {
            console.error('Error creating reserv - ' + error);
            return response.status(401).json({ message: 'Error creating reserv' });
        }
    },
    async delete(request, response) {
        try {
            const { id } = request.params;
            await typeorm_1.getRepository(Reserv_1.default).delete(id);
            return response.status(201).json({ message: 'Reserva deletado' });
        }
        catch (error) {
            console.error('Error deleting reserv - ' + error);
            return response.status(401).json({ message: 'Error deleting reserv' });
        }
    }
};
