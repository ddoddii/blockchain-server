/*
  Warnings:

  - You are about to alter the column `gasUsed` on the `TransactionReceipt` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `BigInt`.
  - You are about to alter the column `effectiveGasPrice` on the `TransactionReceipt` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "TransactionReceipt" ALTER COLUMN "contractAddress" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "gasUsed" SET DATA TYPE BIGINT,
ALTER COLUMN "effectiveGasPrice" DROP NOT NULL,
ALTER COLUMN "effectiveGasPrice" SET DATA TYPE BIGINT,
ALTER COLUMN "logsBloom" SET DATA TYPE CHAR(514),
ALTER COLUMN "confirmations" DROP NOT NULL;
