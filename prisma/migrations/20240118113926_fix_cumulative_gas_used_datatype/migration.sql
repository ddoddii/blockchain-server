/*
  Warnings:

  - You are about to alter the column `cumulativeGasUsed` on the `TransactionReceipt` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "TransactionReceipt" ALTER COLUMN "cumulativeGasUsed" SET DATA TYPE BIGINT;
