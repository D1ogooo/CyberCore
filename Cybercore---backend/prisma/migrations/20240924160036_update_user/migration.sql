/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `Product` table. All the data in the column will be lost.
  - Added the required column `imagem` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "quantity" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "valor",
ADD COLUMN     "imagem" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "preco" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'usuario';
