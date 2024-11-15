"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../configs/auth");
class FavoriteController {
    async deleteFavorite(req, res) {
        try {
            const { id } = req.params;
            const authHeader = req.headers.authorization;
            const token = authHeader?.split(" ")[1];
            const idProduct = id;
            if (!token) {
                res.status(401).json({ message: "Acesso negado" });
                return;
            }
            await prisma_1.prisma.Favorite.deleteMany({
                where: {
                    productId: idProduct,
                },
            });
            res.status(200).json({ success: "Item deletado 🛒" });
        }
        catch (error) {
            res.status(400).json({ error: "Erro ao tentar deletar item" });
            return;
        }
    }
    async getall(req, res) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader?.split(" ")[1];
            if (!token) {
                res.status(401).json({ message: "Acesso negado" });
                return;
            }
            const decoded = jsonwebtoken_1.default.verify(token, auth_1.jwtConfig.secret);
            const favorites = await prisma_1.prisma.Favorite.findMany({
                where: {
                    userId: decoded.id,
                },
                include: {
                    product: true,
                },
            });
            res.status(200).json({ favorites });
        }
        catch (error) {
            res.status(400).json({ error: "Dados inválidos" });
            return;
        }
    }
    async favoriteItem(req, res) {
        try {
            const { id } = req.params;
            const authHeader = req.headers.authorization;
            const token = authHeader?.split(" ")[1];
            if (!token) {
                res.status(401).json({ message: "Acesso negado" });
                return;
            }
            const decoded = jsonwebtoken_1.default.verify(token, auth_1.jwtConfig.secret);
            if (typeof decoded.id !== "string") {
                res.status(401).json({ message: "Token inválido" });
                return;
            }
            const productExists = await prisma_1.prisma.product.findUnique({
                where: {
                    id: id,
                },
            });
            if (!productExists) {
                res.status(404).json({ message: "Produto não encontrado" });
                return;
            }
            const favoriteUserCreate = await prisma_1.prisma.favorite.create({
                data: {
                    userId: decoded.id,
                    productId: id,
                },
            });
            res.status(201).json({ favoriteUserCreate });
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao favoritar item" });
            return;
        }
    }
}
exports.FavoriteController = FavoriteController;
