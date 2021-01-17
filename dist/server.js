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
app.use(cors_1.default({
    origin: "*",
    methods: "GET, PUT, POST, DELETE"
}));
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(process.env.PORT || 3333);
