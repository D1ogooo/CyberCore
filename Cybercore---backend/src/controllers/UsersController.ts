import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { Request, Response, NextFunction } from "express";
import type {
	CreateUserRequest,
	AuthUserRequest,
	CreateUserRequestdata,
} from "../@types/type";
import { jwtConfig } from "../configs/auth";
import { prisma } from "../lib/prisma";

class UsersController {
	async auth(
		req: Request<AuthUserRequest>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { email, password }: AuthUserRequest = req.body;

			const userExists = await prisma.User.findUnique({
				where: { email },
			});

			if (!userExists) {
				res.status(401).json({ error: "Email inválido" });
				return;
			}

			const verifyPassword = await bcrypt.compare(
				password,
				userExists.password,
			);
			if (!verifyPassword) {
				res.status(401).json({ error: "Senha inválida" });
				return;
			}

			const token = jwt.sign(
				{ id: userExists.id, role: userExists.role },
				jwtConfig.secret,
				{ expiresIn: jwtConfig.expiresIn },
			);

			const user = await prisma.User.findUnique({
				where: { id: userExists.id },
				select: {
					id: true,
					name: true,
					image: true,
				},
			});

			res.status(200).json({ token, user });
		} catch (error) {
			next(error);
		}
	}

	async create(
		req: Request<CreateUserRequest>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { name, email, password }: CreateUserRequestdata = req.body;

			const userExists = await prisma.User.findUnique({
				where: { email },
			});

			if (userExists) {
				res.status(401).json({ error: "Email já cadastrado" });
				return;
			}

			const passwordEncrypt = await bcrypt.hash(password, 8);

			const user = await prisma.User.create({
				data: { name, email, password: passwordEncrypt },
			});

			res.status(201).json({ message: "Conta criada com sucesso" });
		} catch (error) {
			next(error);
		}
	}
}

export { UsersController };
