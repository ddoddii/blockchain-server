/*
  Warnings:

  - The primary key for the `Block` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TransactionReceipt` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_blockHash_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_transactionHash_fkey";

-- DropForeignKey
ALTER TABLE "TransactionReceipt" DROP CONSTRAINT "TransactionReceipt_blockHash_fkey";

-- AlterTable
ALTER TABLE "Block" DROP CONSTRAINT "Block_pkey",
ALTER COLUMN "hash" SET DATA TYPE CHAR(66),
ALTER COLUMN "parentHash" SET DATA TYPE CHAR(66),
ALTER COLUMN "transactionHashes" SET DATA TYPE CHAR(66)[],
ADD CONSTRAINT "Block_pkey" PRIMARY KEY ("hash");

-- AlterTable
ALTER TABLE "Log" DROP CONSTRAINT "Log_pkey",
ALTER COLUMN "transactionHash" SET DATA TYPE CHAR(66),
ALTER COLUMN "blockHash" SET DATA TYPE CHAR(66),
ALTER COLUMN "topics" SET DATA TYPE CHAR(66)[],
ADD CONSTRAINT "Log_pkey" PRIMARY KEY ("transactionHash");

-- AlterTable
ALTER TABLE "TransactionReceipt" DROP CONSTRAINT "TransactionReceipt_pkey",
ALTER COLUMN "transactionHash" SET DATA TYPE CHAR(66),
ALTER COLUMN "blockHash" SET DATA TYPE CHAR(66),
ALTER COLUMN "root" SET DATA TYPE VARCHAR(66),
ADD CONSTRAINT "TransactionReceipt_pkey" PRIMARY KEY ("transactionHash");

-- AddForeignKey
ALTER TABLE "TransactionReceipt" ADD CONSTRAINT "TransactionReceipt_blockHash_fkey" FOREIGN KEY ("blockHash") REFERENCES "Block"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_blockHash_fkey" FOREIGN KEY ("blockHash") REFERENCES "Block"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_transactionHash_fkey" FOREIGN KEY ("transactionHash") REFERENCES "TransactionReceipt"("transactionHash") ON DELETE RESTRICT ON UPDATE CASCADE;
