"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = express_1.Router();
const UsersControllers_1 = __importDefault(require("./controllers/UsersControllers"));
const CoursesControllers_1 = __importDefault(require("./controllers/CoursesControllers"));
const LocalizationControllers_1 = __importDefault(require("./controllers/LocalizationControllers"));
const ReservesControllers_1 = __importDefault(require("./controllers/ReservesControllers"));
const StudentControllers_1 = __importDefault(require("./controllers/StudentControllers"));
routes.get('/', (request, response) => {
    return response.status(200).json({ message: 'Open Server' });
});
// SignIn & SignUp
routes.post('/login', UsersControllers_1.default.show);
routes.post('/register', UsersControllers_1.default.create);
// Professor
routes.get('/teachers/name/:id', UsersControllers_1.default.name);
// Aluno
routes.get('/students/area/:area', StudentControllers_1.default.area);
routes.get('/students/points/desc', StudentControllers_1.default.points);
// Crud Curso
routes.post('/courses/create', CoursesControllers_1.default.create);
routes.get('/courses/search/:search', CoursesControllers_1.default.show);
routes.get('/courses/area/:area', CoursesControllers_1.default.area);
routes.get('/courses/details/:id', CoursesControllers_1.default.index);
routes.put('/courses/edit/:id', CoursesControllers_1.default.edit);
routes.delete('/courses/delete/:id', CoursesControllers_1.default.delete);
// Crud Localização
routes.get('/localization', LocalizationControllers_1.default.show);
routes.post('/localization/create', LocalizationControllers_1.default.create);
routes.get('/localization/search/:search', LocalizationControllers_1.default.search);
routes.put('/localization/reserv/:id', LocalizationControllers_1.default.reserv);
routes.get('/localization/details/:id', LocalizationControllers_1.default.index);
// Crud Reserves
routes.post('/reserves/create', ReservesControllers_1.default.create);
routes.get('/reserves', ReservesControllers_1.default.show);
routes.get('/reserves/details/:id', ReservesControllers_1.default.index);
routes.delete('/reserves/delete/:id', ReservesControllers_1.default.delete);
exports.default = routes;
