import bcrypt from "bcrypt";
import fs from "node:fs";
import path from "node:path";
import { prisma } from "../lib/prisma";
import type { Request, Response, NextFunction } from "express";
import type { CreateUserRequestdata } from "../@types/type";

async function UsersAvatarController(
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	req: Request<{}, {}, CreateUserRequestdata, {}>,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const { email, password } = req.body;
		let imageRequest = req.file ? req.file.path : null;

		if (!imageRequest) {
			res.status(400).json({ error: "Imagem não declarada" });
			return;
		}

		const userFromDb = await prisma.User.findUnique({
			where: { email },
			select: { password: true, image: true },
		});

		if (!userFromDb) {
			res.status(404).json({ error: "Usuário não encontrado" });
			return;
		}

		const passwordMatch = await bcrypt.compare(password, userFromDb.password);
		if (!passwordMatch) {
			res.status(401).json({ error: "Senha inválida" });
			return;
		}

		if (userFromDb.image) {
			const filePath = path.join(
				__dirname,
				"../uploads",
				path.basename(userFromDb.image),
			);
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath);
			}
		}

		const imageName = path.basename(imageRequest);
		imageRequest = `/uploads/${imageName}`;

		await prisma.User.update({
			where: { email },
			data: { image: imageRequest },
		});

		const updatedUser = await prisma.User.findUnique({
			where: { email },
			select: {
				id: true,
				name: true,
				image: true,
			},
		});

		res.status(202).json({ user: updatedUser });
	} catch (error) {
		next(error);
	}
}

export { UsersAvatarController };
