import express from "express";
import cors from "cors";
import path from "node:path";
import { router } from "./routes/index";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = 3333;
app.listen(PORT, () => {
	console.log(`👩‍💻 Server running on port: ${PORT} 👩‍💻`);
});
