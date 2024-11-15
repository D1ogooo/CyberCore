import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { jwtConfig } from "../configs/auth";

class FavoriteController {
	async deleteFavorite(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const authHeader = req.headers.authorization;
			const token = authHeader?.split(" ")[1];
			const idProduct = id;

			if (!token) {
				res.status(401).json({ message: "Acesso negado" });
				return;
			}

			await prisma.Favorite.deleteMany({
				where: {
					productId: idProduct,
				},
			});
			res.status(200).json({ success: "Item deletado 🛒" });
		} catch (error) {
			res.status(400).json({ error: "Erro ao tentar deletar item" });
			return;
		}
	}

	async getall(req: Request, res: Response) {
		try {
			const authHeader = req.headers.authorization;
			const token = authHeader?.split(" ")[1];

			if (!token) {
				res.status(401).json({ message: "Acesso negado" });
				return;
			}

			const decoded = jwt.verify(token, jwtConfig.secret) as JwtPayload;
			const favorites = await prisma.Favorite.findMany({
				where: {
					userId: decoded.id,
				},
				include: {
					product: true,
				},
			});

			res.status(200).json({ favorites });
		} catch (error) {
			res.status(400).json({ error: "Dados inválidos" });
			return;
		}
	}

	async favoriteItem(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;

			const authHeader = req.headers.authorization;
			const token = authHeader?.split(" ")[1];

			if (!token) {
				res.status(401).json({ message: "Acesso negado" });
				return;
			}

			const decoded = jwt.verify(token, jwtConfig.secret) as JwtPayload;

			if (typeof decoded.id !== "string") {
				res.status(401).json({ message: "Token inválido" });
				return;
			}

			const productExists = await prisma.product.findUnique({
				where: {
					id: id,
				},
			});

			if (!productExists) {
				res.status(404).json({ message: "Produto não encontrado" });
				return;
			}

			const favoriteUserCreate = await prisma.favorite.create({
				data: {
					userId: decoded.id,
					productId: id,
				},
			});

			res.status(201).json({ favoriteUserCreate });
		} catch (error) {
			res.status(500).json({ error: "Erro ao favoritar item" });
			return;
		}
	}
}

export { FavoriteController };
