"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_path_1 = __importDefault(require("node:path"));
const index_1 = require("./routes/index");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(index_1.router);
app.use("/uploads", express_1.default.static(node_path_1.default.join(__dirname, "uploads")));
const PORT = 3333;
app.listen(PORT, () => {
    console.log(`👩‍💻 Server running on port: ${PORT} 👩‍💻`);
});
