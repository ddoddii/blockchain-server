import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { BlockDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class BlockService {
    constructor(
        private prisma: PrismaService,
        private config: ConfigService,
    ) {}
    INFURA_API = this.config.get('INFURA_API');
    network = 'mainnet';
    provider = new ethers.InfuraProvider(this.network, this.INFURA_API);

    // Returns the block number (or height) of the most recently mined block.
    async getRecentBlockNumber() {
        return this.provider.getBlockNumber();
    }

    // Saves (block, transacation receipt, logs) and return block data
    async retrieveEthersBlockData(dto: BlockDto) {
        const blockInfo = await this.provider.getBlock(dto.blockName);
        const blockData = {
            hash: blockInfo.hash,
            parentHash: blockInfo.parentHash,
            number: blockInfo.number,
            timestamp: BigInt(blockInfo.timestamp),
            nonce: blockInfo.nonce,
            difficulty: blockInfo.difficulty,
            gasLimit: BigInt(blockInfo.gasLimit),
            gasUsed: BigInt(blockInfo.gasUsed),
            miner: blockInfo.miner,
            extraData: blockInfo.extraData,
        };
        try {
            await this.saveBlockData(blockData);
            await this.saveTransactionReceiptData(blockData);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                }
            }
        }

        return JSON.stringify(blockInfo, null, 4);
    }

    // Save Block Data
    async saveBlockData(blockData) {
        await this.prisma.block.create({
            data: {
                ...blockData,
            },
        });
    }

    // Save transaction Receipt Data in the block
    async saveTransactionReceiptData(blockData) {
        const transactionHashes = blockData.transactionHashes;
        transactionHashes.forEach(async (transactionHash, _, __) => {
            const transactionReceipt =
                await this.provider.getTransactionReceipt(transactionHash);
            const transactionReceiptData = {
                transactionHash: transactionReceipt.hash,
                blockHash: transactionReceipt.blockHash,
                blockNumber: transactionReceipt.blockNumber,
                to: transactionReceipt.to,
                from: transactionReceipt.from,
                contractAddress: transactionReceipt.contractAddress,
                transactionIndex: transactionReceipt.index,
                gasUsed: transactionReceipt.gasUsed,
                logsBloom: transactionReceipt.logsBloom,
                cumulativeGasUsed: transactionReceipt.cumulativeGasUsed,
                status: transactionReceipt.status,
            };
            await this.prisma.transactionReceipt.create({
                data: {
                    ...transactionReceiptData,
                },
            });
            // Save logs in the transactionReceipt
            this.saveTransactionReceiptLogs(transactionReceipt);
        });
    }

    // Save logs
    async saveTransactionReceiptLogs(transactionReceipt) {
        const logs = transactionReceipt.logs;

        for (const log of logs) {
            const logData = {
                transactionHash: log.transactionHash,
                blockHash: log.blockHash,
                blockNumber: log.blockNumber,
                address: log.address,
                data: log.data,
                topics: log.topics,
                transactionIndex: log.transactionIndex,
                logIndex: log.index,
                removed: log.removed,
            };
            await this.prisma.log.create({
                data: {
                    ...logData,
                },
            });
        }
    }

    // Return Block Data with transaction recipts, logs based on Block Hash
    async getBlockData(blockHash: string) {
        const blockData = await this.prisma.block.findUnique({
            where: {
                hash: blockHash,
            },
            include: {
                TransactionReceipt: {
                    include: {
                        Log: true,
                    },
                },
            },
        });
        return blockData;
    }
}
