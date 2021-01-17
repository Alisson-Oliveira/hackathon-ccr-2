"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Course_1 = __importDefault(require("../models/Course"));
const Teacher_1 = __importDefault(require("../models/Teacher"));
exports.default = {
    async index(request, response) {
        try {
            const { id } = request.params;
            const course = await typeorm_1.getRepository(Course_1.default).findOne({
                where: { _id: id }
            });
            if (!course) {
                return response.status(201).json([]);
            }
            return response.status(201).json(course);
        }
        catch (error) {
            console.error('Error showing course - ' + error);
            return response.status(401).json({ message: 'Error showing course' });
        }
    },
    async show(request, response) {
        try {
            const { search } = request.params;
            const courses = await typeorm_1.getRepository(Course_1.default)
                .createQueryBuilder('courses')
                .select([
                'courses.title',
                'courses.hours',
                'courses.area',
                'courses.teacher_id'
            ])
                .where('courses.title like :search', { search: `%${search}%` })
                .getManyAndCount();
            return response.status(201).json(courses);
        }
        catch (error) {
            console.error('Error showing course - ' + error);
            return response.status(401).json({ message: 'Error showing course' });
        }
    },
    async area(request, response) {
        try {
            const { area } = request.params;
            const localization = await typeorm_1.getRepository(Course_1.default)
                .createQueryBuilder('courses')
                .where('courses.area like :area', { area })
                .getManyAndCount();
            return response.status(200).json(localization);
        }
        catch (error) {
            console.error('Error showing localization - ' + error);
            return response.status(400).json({ message: 'Error showing localization' });
        }
    },
    async create(request, response) {
        try {
            const { title, amount, hours, area, description, teacher_id, } = request.body;
            const coursesRepository = typeorm_1.getRepository(Course_1.default);
            const teacher = await typeorm_1.getRepository(Teacher_1.default).findOne({
                where: { _id: teacher_id }
            });
            if (!teacher) {
                return response.status(401).json({ message: 'Teacher Not Found' });
            }
            const data = {
                title,
                amount,
                hours,
                area,
                description,
                teacher_id: teacher._id,
            };
            const course = coursesRepository.create(data);
            await coursesRepository.save(course);
            return response.status(201).json(course);
        }
        catch (error) {
            console.error('Error creating course - ' + error);
            return response.status(401).json({ message: 'Error creating course' });
        }
    },
    async delete(request, response) {
        try {
            const { id } = request.params;
            await typeorm_1.getRepository(Course_1.default).delete(id);
            return response.status(201).json({ message: 'Curso deletado' });
        }
        catch (error) {
            console.error('Error deleting course - ' + error);
            return response.status(401).json({ message: 'Error deleting course' });
        }
    },
    async edit(request, response) {
        try {
            const { id } = request.params;
            const { title, amount, hours, area, description, teacher_id, } = request.body;
            const courseRepository = typeorm_1.getRepository(Course_1.default);
            const course = await courseRepository.findOne({
                where: { _id: id }
            });
            const data = Object.assign(Object.assign({}, course), { title,
                amount,
                hours,
                area,
                description,
                teacher_id });
            await courseRepository.save(Object.assign(Object.assign({}, course), data));
            return response.status(201).json({ message: 'Curso Editado', data });
        }
        catch (error) {
            console.error('Error editing course - ' + error);
            return response.status(401).json('Error editing course');
        }
    }
};
