import fs from "node:fs";
import path from "node:path";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { jwtConfig } from "../configs/auth";

class ProductsController {
	async create(req: Request, res: Response): Promise<void> {
		const authHeader = req.headers.authorization;
		const token = authHeader?.split(" ")[1];

		if (!token) {
			res.status(401).json({ error: "Token inválido" });
			return;
		}

		try {
			const { preco, sobre } = req.body;
			let image = req.file ? req.file.path : null;
			const decoded = jwt.verify(token, jwtConfig.secret) as { id: string };

			if (image) {
				const imageName = path.basename(image);
				image = `/uploads/${imageName}`;
			} else {
				res.status(401).json({ error: "Imagem não declarada" });
				return;
			}

			await prisma.Product.create({
				data: {
					imagem: image,
					preco: Number(preco),
					sobre,
				},
			});
			res.status(200).json({
				"sucesso!": "Produto criado com sucesso",
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}

	async delete(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			const imageDB = await prisma.Product.findUnique({
				where: {
					id,
				},
			});
			if (imageDB?.imagem) {
				const filePath = path.join(
					__dirname,
					"../uploads",
					path.basename(imageDB.imagem),
				);
				if (fs.existsSync(filePath)) {
					fs.unlinkSync(filePath);
				}
			}
			await prisma.Product.delete({
				where: {
					id,
				},
			});
			res.status(200).json({ message: "Produto deletado com sucesso" });
		} catch (error) {
			res.status(401).json({ error: "Erro ao tentar deletar o produto" });
		}
	}

	async list(req: Request, res: Response): Promise<void> {
		const authHeader = req.headers.authorization;
		const token = authHeader?.split(" ")[1];

		if (!token) {
			res.status(401).json({ error: "Token inválido" });
			return;
		}

		try {
			const publicItens = await prisma.product.findMany();
			res.status(200).json({ publicItens });
		} catch (error) {
			console.error("Erro ao processar requisição: ", error);
			res.status(500).json({ error: "Erro ao listar produtos" });
		}
	}

	async listUser(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const product = await prisma.Product.findUnique({
				where: {
					id,
				},
			});
			if (!product) {
				res.status(404).json({ error: "Produto não encontrado" });
				return;
			}
			res.status(200).json(product);
		} catch (error) {
			res.status(401).json({ error: "Erro ao tentar buscar o produto" });
		}
	}
}

export { ProductsController };
