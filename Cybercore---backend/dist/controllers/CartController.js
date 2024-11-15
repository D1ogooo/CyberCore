"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../configs/auth");
class CartController {
    async create(req, res) {
        const { id } = req.params;
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Acesso negado" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, auth_1.jwtConfig.secret);
        let verifyCart = await prisma_1.prisma.Cart.findFirst({
            where: {
                userId: decoded.id,
            },
        });
        if (!verifyCart) {
            verifyCart = await prisma_1.prisma.Cart.create({
                data: {
                    userId: decoded.id,
                },
            });
        }
        const createProductCart = await prisma_1.prisma.CartItem.create({
            data: {
                cartId: verifyCart.id,
                productId: id,
                quantity: 1,
            },
        });
        res.status(200).json({ createProductCart });
    }
    async getAll(req, res) {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Acesso negado" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, auth_1.jwtConfig.secret);
        const allProductsCart = await prisma_1.prisma.Cart.findMany({
            where: {
                userId: decoded.id,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        res.status(200).json({ allProductsCart });
    }
    async deleteAll(req, res) {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Acesso negado" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, auth_1.jwtConfig.secret);
        await prisma_1.prisma.Cart.deleteMany({
            where: {
                userId: decoded.id,
            },
        });
        res.status(200).json({ "sucesso!": "itens deletados" });
    }
    async deleteProduct(req, res) {
        const { id } = req.params;
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Acesso negado" });
            return;
        }
        await prisma_1.prisma.CartItem.delete({
            where: {
                id,
            },
        });
        res.status(200).json({ "sucesso!": "item deletado do carrinho" });
    }
}
exports.CartController = CartController;
