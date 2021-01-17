"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getType = void 0;
const User_1 = __importDefault(require("../models/User"));
const Teacher_1 = __importDefault(require("../models/Teacher"));
const Business_1 = __importDefault(require("../models/Business"));
function getType(type) {
    switch (type) {
        case 'student':
            return User_1.default;
        case 'teacher':
            return Teacher_1.default;
        case 'business':
            return Business_1.default;
        default:
            break;
    }
}
exports.getType = getType;
