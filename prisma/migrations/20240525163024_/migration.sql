-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;
