"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
exports.prisma = prisma;
