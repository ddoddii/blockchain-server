-- CreateTable
CREATE TABLE "Block" (
    "hash" CHAR(64) NOT NULL,
    "parentHash" CHAR(64) NOT NULL,
    "number" BIGINT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "nonce" CHAR(64) NOT NULL,
    "difficulty" DECIMAL(65,30),
    "extendedDifficulty" DECIMAL(65,30),
    "gasLimit" DECIMAL(65,30) NOT NULL,
    "gasUsed" DECIMAL(65,30) NOT NULL,
    "miner" CHAR(42) NOT NULL,
    "extraData" TEXT,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("hash")
);

-- CreateTable
CREATE TABLE "TransactionReceipt" (
    "transactionHash" CHAR(64) NOT NULL,
    "blockHash" CHAR(64) NOT NULL,
    "to" CHAR(42) NOT NULL,
    "from" CHAR(42) NOT NULL,
    "contractAddress" CHAR(42) NOT NULL,
    "transactionIndex" INTEGER NOT NULL,
    "type" SMALLINT NOT NULL,
    "root" VARCHAR(64),
    "gasUsed" DECIMAL(65,30) NOT NULL,
    "effectiveGasPrice" DECIMAL(65,30) NOT NULL,
    "logsBloom" CHAR(512),
    "blockNumber" BIGINT NOT NULL,
    "confirmations" BIGINT NOT NULL,
    "cumulativeGasUsed" DECIMAL(65,30),
    "byzantium" BOOLEAN DEFAULT false,
    "status" SMALLINT NOT NULL,

    CONSTRAINT "TransactionReceipt_pkey" PRIMARY KEY ("transactionHash")
);

-- CreateTable
CREATE TABLE "Log" (
    "transactionHash" CHAR(64) NOT NULL,
    "blockHash" CHAR(64) NOT NULL,
    "removed" BOOLEAN,
    "address" CHAR(42) NOT NULL,
    "data" TEXT,
    "topics" CHAR(64)[],
    "transactionIndex" INTEGER NOT NULL,
    "logIndex" INTEGER NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("transactionHash")
);

-- AddForeignKey
ALTER TABLE "TransactionReceipt" ADD CONSTRAINT "TransactionReceipt_blockHash_fkey" FOREIGN KEY ("blockHash") REFERENCES "Block"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_blockHash_fkey" FOREIGN KEY ("blockHash") REFERENCES "Block"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_transactionHash_fkey" FOREIGN KEY ("transactionHash") REFERENCES "TransactionReceipt"("transactionHash") ON DELETE RESTRICT ON UPDATE CASCADE;
