import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { jwtConfig } from "../configs/auth";

class CartController {
	async create(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const authHeader = req.headers.authorization;
		const token = authHeader?.split(" ")[1];

		if (!token) {
			res.status(401).json({ message: "Acesso negado" });
			return;
		}

		const decoded = jwt.verify(token, jwtConfig.secret) as { id: string };
		let verifyCart = await prisma.Cart.findFirst({
			where: {
				userId: decoded.id,
			},
		});

		if (!verifyCart) {
			verifyCart = await prisma.Cart.create({
				data: {
					userId: decoded.id,
				},
			});
		}

		const createProductCart = await prisma.CartItem.create({
			data: {
				cartId: verifyCart.id,
				productId: id,
				quantity: 1,
			},
		});

		res.status(200).json({ createProductCart });
	}

	async getAll(req: Request, res: Response): Promise<void> {
		const authHeader = req.headers.authorization;
		const token = authHeader?.split(" ")[1];

		if (!token) {
			res.status(401).json({ message: "Acesso negado" });
			return;
		}

		const decoded = jwt.verify(token, jwtConfig.secret) as { id: string };

		const allProductsCart = await prisma.Cart.findMany({
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

	async deleteAll(req: Request, res: Response): Promise<void> {
		const authHeader = req.headers.authorization;
		const token = authHeader?.split(" ")[1];

		if (!token) {
			res.status(401).json({ message: "Acesso negado" });
			return;
		}

		const decoded = jwt.verify(token, jwtConfig.secret) as { id: string };
		await prisma.Cart.deleteMany({
			where: {
				userId: decoded.id,
			},
		});
		res.status(200).json({ "sucesso!": "itens deletados" });
	}

	async deleteProduct(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const authHeader = req.headers.authorization;
		const token = authHeader?.split(" ")[1];

		if (!token) {
			res.status(401).json({ message: "Acesso negado" });
			return;
		}

		await prisma.CartItem.delete({
			where: {
				id,
			},
		});
		res.status(200).json({ "sucesso!": "item deletado do carrinho" });
	}
}

export { CartController };
