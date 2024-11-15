import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import { type Request, Response } from "express";

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (
		_req: Request,
		_file: Express.Multer.File,
		cb: (error: Error | null, destination: string) => void,
	) => {
		cb(null, uploadDir);
	},
	filename: (
		_req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, filename: string) => void,
	) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

export const upload = multer({ storage: storage });
