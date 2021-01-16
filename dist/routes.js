"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = express_1.Router();
const UsersControllers_1 = __importDefault(require("./controllers/UsersControllers"));
const CoursesControllers_1 = __importDefault(require("./controllers/CoursesControllers"));
routes.get('/', (request, response) => {
    return response.status(200).json({ message: 'Open Server' });
});
routes.post('/login', UsersControllers_1.default.show);
routes.post('/register', UsersControllers_1.default.create);
routes.post('/courses/create', CoursesControllers_1.default.create);
routes.get('/courses/search/:search', CoursesControllers_1.default.show);
routes.get('/courses/details/:id', CoursesControllers_1.default.index);
routes.put('/courses/edit/:id', CoursesControllers_1.default.edit);
routes.delete('/courses/delete/:id', CoursesControllers_1.default.delete);
exports.default = routes;
