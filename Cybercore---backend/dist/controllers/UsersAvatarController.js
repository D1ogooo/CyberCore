"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersAvatarController = UsersAvatarController;
const bcrypt_1 = __importDefault(require("bcrypt"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const prisma_1 = require("../lib/prisma");
async function UsersAvatarController(
// biome-ignore lint/complexity/noBannedTypes: <explanation>
req, res, next) {
    try {
        const { email, password } = req.body;
        let imageRequest = req.file ? req.file.path : null;
        if (!imageRequest) {
            res.status(400).json({ error: "Imagem não declarada" });
            return;
        }
        const userFromDb = await prisma_1.prisma.User.findUnique({
            where: { email },
            select: { password: true, image: true },
        });
        if (!userFromDb) {
            res.status(404).json({ error: "Usuário não encontrado" });
            return;
        }
        const passwordMatch = await bcrypt_1.default.compare(password, userFromDb.password);
        if (!passwordMatch) {
            res.status(401).json({ error: "Senha inválida" });
            return;
        }
        if (userFromDb.image) {
            const filePath = node_path_1.default.join(__dirname, "../uploads", node_path_1.default.basename(userFromDb.image));
            if (node_fs_1.default.existsSync(filePath)) {
                node_fs_1.default.unlinkSync(filePath);
            }
        }
        const imageName = node_path_1.default.basename(imageRequest);
        imageRequest = `/uploads/${imageName}`;
        await prisma_1.prisma.User.update({
            where: { email },
            data: { image: imageRequest },
        });
        const updatedUser = await prisma_1.prisma.User.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                image: true,
            },
        });
        res.status(202).json({ user: updatedUser });
    }
    catch (error) {
        next(error);
    }
}
