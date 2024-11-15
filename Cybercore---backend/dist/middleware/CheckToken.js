"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckToken = CheckToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../configs/auth");
function CheckToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token inexistente" });
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, auth_1.jwtConfig.secret);
        next();
    }
    catch (error) {
        res.status(400).json({ message: "Token inválido" });
    }
}
