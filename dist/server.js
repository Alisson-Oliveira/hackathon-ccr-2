"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
require("./database");
const app = express_1.default();
dotenv_1.default.config();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.use(cors_1.default());
    next();
});
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(process.env.PORT || 3333);
