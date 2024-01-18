/*
  Warnings:

  - The primary key for the `Log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `blockNumber` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Log" DROP CONSTRAINT "Log_pkey",
ADD COLUMN     "blockNumber" INTEGER NOT NULL,
ADD CONSTRAINT "Log_pkey" PRIMARY KEY ("blockHash", "logIndex");

-- AddForeignKey
ALTER TABLE "TransactionReceipt" ADD CONSTRAINT "TransactionReceipt_blockHash_fkey" FOREIGN KEY ("blockHash") REFERENCES "Block"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;
