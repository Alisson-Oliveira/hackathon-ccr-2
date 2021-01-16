"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = express_1.Router();
routes.get('/', (request, response) => {
    return response.send({ message: 'hello world!' });
});
exports.default = routes;
