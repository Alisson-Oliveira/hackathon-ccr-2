"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("../utils/utils");
exports.default = {
    /**
     * @param request
     * @param response
     * @returns o nome do professor.
     **/
    async name(request, response) {
        const { id } = request.params;
        const typeRepository = utils_1.getType('teacher');
        if (!typeRepository) {
            return response.status(401).send({ error: 'Type not found.' });
        }
        const usersRepository = typeorm_1.getRepository(typeRepository);
        const user = await usersRepository.findOne({
            where: { _id: id }
        });
        if (!user) {
            return response.status(401).send({ error: 'Teacher not found.' });
        }
        return response.status(201).json(user.name);
    },
    /**
     * @param request
     * @param response
     * @returns as informações do usuário depois de efetuar o login.
     **/
    async show(request, response) {
        const { email, password, type } = request.body;
        const typeRepository = utils_1.getType(type);
        if (!typeRepository) {
            return response.status(401).send({ error: 'Type not found.' });
        }
        const usersRepository = typeorm_1.getRepository(typeRepository);
        const user = await usersRepository.findOne({ email });
        if (!user) {
            return response.status(401).send({ error: 'User not found.' });
        }
        if (!await bcrypt_1.default.compare(password, user.password)) {
            return response.status(401).send({ error: 'Invalid password.' });
        }
        return response.status(201).json(user);
    },
    /**
     * @param request
     * @param response
     * @returns cria um novo aluno, professor ou empresa.
     **/
    async create(request, response) {
        try {
            const { name, email, type } = request.body;
            const password = await bcrypt_1.default.hash(request.body.password, 10);
            const typeRepository = utils_1.getType(type);
            if (!typeRepository) {
                return response.status(401).send({ error: 'Type not found.' });
            }
            const usersRepository = typeorm_1.getRepository(typeRepository);
            const data = {
                name,
                email,
                password,
            };
            const user = usersRepository.create(data);
            await usersRepository.save(user);
            return response.status(201).json(user);
        }
        catch (error) {
            console.error('Error creating user - ' + error);
            return response.status(401).json({ message: 'Error creating user' });
        }
    },
};
