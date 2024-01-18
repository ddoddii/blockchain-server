/*
  Warnings:

  - You are about to drop the column `transactionHashes` on the `Block` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Block" DROP COLUMN "transactionHashes";
