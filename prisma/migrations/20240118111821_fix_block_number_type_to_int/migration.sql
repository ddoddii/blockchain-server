/*
  Warnings:

  - You are about to alter the column `number` on the `Block` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `blockNumber` on the `TransactionReceipt` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Block" ALTER COLUMN "number" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "TransactionReceipt" ALTER COLUMN "blockNumber" SET DATA TYPE INTEGER;
