"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    async show(request, response) {
        const { email, password } = request.body;
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const user = await usersRepository.findOne({ email });
        if (!user)
            return response.status(401).send({ error: 'User not found.' });
        if (!await bcrypt_1.default.compare(password, user.password))
            return response.status(401).send({ error: 'Invalid password.' });
        return response.status(201).json(user);
    },
    async create(request, response) {
        try {
            const { name, email, } = request.body;
            const password = await bcrypt_1.default.hash(request.body.password, 10);
            const usersRepository = typeorm_1.getRepository(User_1.default);
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
