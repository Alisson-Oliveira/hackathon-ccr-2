"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Localization_1 = __importDefault(require("../models/Localization"));
exports.default = {
    /**
     * @param request
     * @param response
     * @returns uma localização com todas as informações.
     **/
    async index(request, response) {
        try {
            const { id } = request.params;
            const location = await typeorm_1.getRepository(Localization_1.default).findOne({
                where: { _id: id }
            });
            return response.status(200).json(location);
        }
        catch (error) {
            console.error('Error showing localization - ' + error);
            return response.status(400).json({ message: 'Error showing localization' });
        }
    },
    /**
     * @param request
     * @param response
     * @returns todas as localizações com suas informações.
     **/
    async show(request, response) {
        try {
            const localization = await typeorm_1.getRepository(Localization_1.default)
                .createQueryBuilder('localizations')
                .getMany();
            return response.status(200).json(localization);
        }
        catch (error) {
            console.error('Error showing localization - ' + error);
            return response.status(400).json({ message: 'Error showing localization' });
        }
    },
    /**
     * @param request
     * @param response
     * @returns cria um novo ponto de localização.
     **/
    async create(request, response) {
        try {
            const { institution, latitude, longitude, schadule, reservation_location, } = request.body;
            const localizationsRepository = typeorm_1.getRepository(Localization_1.default);
            const data = {
                institution,
                latitude,
                longitude,
                schadule,
                reservation_location,
                available: true,
            };
            await localizationsRepository.save(data);
            return response.status(201).json(data);
        }
        catch (error) {
            console.error('Error creating localization - ' + error);
            return response.status(401).json({ message: 'Error creating localization' });
        }
    },
    /**
     * @param request
     * @param response
     * @returns localizações pesquisadas pelo nome da instituição.
     **/
    async search(request, response) {
        try {
            const { search } = request.params;
            const localizations = await typeorm_1.getRepository(Localization_1.default)
                .createQueryBuilder('localizations')
                .select('localizations.institution')
                .where('localizations.institution like :search', { search: `%${search}%` })
                .getManyAndCount();
            return response.status(201).json(localizations);
        }
        catch (error) {
            console.error('Error searching localization - ' + error);
            return response.status(401).json({ message: 'Error searching localization' });
        }
    },
    /**
     * @param request
     * @param response
     * @returns uma menssagem com local reservado ou local disponível.
     **/
    async reserv(request, response) {
        try {
            const { id } = request.params;
            const { available } = request.body;
            const localizationsRepository = typeorm_1.getRepository(Localization_1.default);
            const localization = await localizationsRepository.findOne({
                where: { _id: id }
            });
            const data = Object.assign(Object.assign({}, localization), { available });
            await localizationsRepository.save(Object.assign(Object.assign({}, localization), data));
            return response.status(201).json({
                message: !available ? 'Local Reservado' : 'Local Diponível'
            });
        }
        catch (error) {
            console.error('Error reserving localization - ' + error);
            return response.status(401).json({ message: 'Error reserving localization' });
        }
    }
};
