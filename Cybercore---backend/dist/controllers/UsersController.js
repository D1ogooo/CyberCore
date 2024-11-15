"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../configs/auth");
const prisma_1 = require("../lib/prisma");
class UsersController {
    async auth(req, res, next) {
        try {
            const { email, password } = req.body;
            const userExists = await prisma_1.prisma.User.findUnique({
                where: { email },
            });
            if (!userExists) {
                res.status(401).json({ error: "Email inválido" });
                return;
            }
            const verifyPassword = await bcrypt_1.default.compare(password, userExists.password);
            if (!verifyPassword) {
                res.status(401).json({ error: "Senha inválida" });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ id: userExists.id, role: userExists.role }, auth_1.jwtConfig.secret, { expiresIn: auth_1.jwtConfig.expiresIn });
            const user = await prisma_1.prisma.User.findUnique({
                where: { id: userExists.id },
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            });
            res.status(200).json({ token, user });
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const userExists = await prisma_1.prisma.User.findUnique({
                where: { email },
            });
            if (userExists) {
                res.status(401).json({ error: "Email já cadastrado" });
                return;
            }
            const passwordEncrypt = await bcrypt_1.default.hash(password, 8);
            const user = await prisma_1.prisma.User.create({
                data: { name, email, password: passwordEncrypt },
            });
            res.status(201).json({ message: "Conta criada com sucesso" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UsersController = UsersController;
