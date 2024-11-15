import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { jwtConfig } from "../configs/auth";

function CheckToken(req: Request, res: Response, next: NextFunction): void {
	const authHeader = req.headers.authorization;
	const token = authHeader?.split(" ")[1];

	if (!token) {
		res.status(401).json({ message: "Token inexistente" });
		return;
	}

	try {
		jwt.verify(token, jwtConfig.secret);
		next();
	} catch (error) {
		res.status(400).json({ message: "Token inválido" });
	}
}

export { CheckToken };
