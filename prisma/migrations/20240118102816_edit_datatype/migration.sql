/*
  Warnings:

  - You are about to alter the column `difficulty` on the `Block` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `BigInt`.
  - You are about to alter the column `extendedDifficulty` on the `Block` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `BigInt`.
  - You are about to alter the column `gasLimit` on the `Block` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `BigInt`.
  - You are about to alter the column `gasUsed` on the `Block` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `BigInt`.
  - Made the column `extendedDifficulty` on table `Block` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Block" ALTER COLUMN "difficulty" SET DATA TYPE BIGINT,
ALTER COLUMN "extendedDifficulty" SET NOT NULL,
ALTER COLUMN "extendedDifficulty" SET DATA TYPE BIGINT,
ALTER COLUMN "gasLimit" SET DATA TYPE BIGINT,
ALTER COLUMN "gasUsed" SET DATA TYPE BIGINT;
