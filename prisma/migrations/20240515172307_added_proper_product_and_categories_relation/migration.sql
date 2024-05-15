/*
  Warnings:

  - You are about to drop the column `productId` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `pricePaidInCents` on the `Order` table. All the data in the column will be lost.
  - Added the required column `price` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_productId_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "pricePaidInCents",
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
