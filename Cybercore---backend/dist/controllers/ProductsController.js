"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../configs/auth");
class ProductsController {
    async create(req, res) {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        if (!token) {
            res.status(401).json({ error: "Token inválido" });
            return;
        }
        try {
            const { preco, sobre } = req.body;
            let image = req.file ? req.file.path : null;
            const decoded = jsonwebtoken_1.default.verify(token, auth_1.jwtConfig.secret);
            if (image) {
                const imageName = node_path_1.default.basename(image);
                image = `/uploads/${imageName}`;
            }
            else {
                res.status(401).json({ error: "Imagem não declarada" });
                return;
            }
            await prisma_1.prisma.Product.create({
                data: {
                    imagem: image,
                    preco: Number(preco),
                    sobre,
                },
            });
            res.status(200).json({
                "sucesso!": "Produto criado com sucesso",
            });
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const imageDB = await prisma_1.prisma.Product.findUnique({
                where: {
                    id,
                },
            });
            if (imageDB?.imagem) {
                const filePath = node_path_1.default.join(__dirname, "../uploads", node_path_1.default.basename(imageDB.imagem));
                if (node_fs_1.default.existsSync(filePath)) {
                    node_fs_1.default.unlinkSync(filePath);
                }
            }
            await prisma_1.prisma.Product.delete({
                where: {
                    id,
                },
            });
            res.status(200).json({ message: "Produto deletado com sucesso" });
        }
        catch (error) {
            res.status(401).json({ error: "Erro ao tentar deletar o produto" });
        }
    }
    async list(req, res) {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        if (!token) {
            res.status(401).json({ error: "Token inválido" });
            return;
        }
        try {
            const publicItens = await prisma_1.prisma.product.findMany();
            res.status(200).json({ publicItens });
        }
        catch (error) {
            console.error("Erro ao processar requisição: ", error);
            res.status(500).json({ error: "Erro ao listar produtos" });
        }
    }
    async listUser(req, res) {
        try {
            const { id } = req.params;
            const product = await prisma_1.prisma.Product.findUnique({
                where: {
                    id,
                },
            });
            if (!product) {
                res.status(404).json({ error: "Produto não encontrado" });
                return;
            }
            res.status(200).json(product);
        }
        catch (error) {
            res.status(401).json({ error: "Erro ao tentar buscar o produto" });
        }
    }
}
exports.ProductsController = ProductsController;
