import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { BlockDto, TransactionDto } from './dto';

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

    // Saves block data
    async retrieveEthersBlockData(dto: BlockDto) {
        const blockInfo = await this.provider.getBlock(dto.blockName);
        const blockData = {
            hash: blockInfo.hash,
            parentHash: blockInfo.parentHash,
            number: BigInt(blockInfo.number),
            timestamp: BigInt(blockInfo.timestamp),
            nonce: blockInfo.nonce,
            difficulty: blockInfo.difficulty,
            gasLimit: BigInt(blockInfo.gasLimit),
            gasUsed: BigInt(blockInfo.gasUsed),
            miner: blockInfo.miner,
            extraData: blockInfo.extraData,
            transactionHashes: [...blockInfo.transactions],
        };
        await this.prisma.block.create({
            data: {
                ...blockData,
            },
        });
        return JSON.stringify(blockInfo, null, 4);
    }

    // Returns the transaction receipt for hash or null if the transaction has not been mined.
    async getTransactionReceiptByHash(dto: TransactionDto) {
        const transactionReceipt = await this.provider.getTransactionReceipt(
            dto.transactionHash,
        );
        return JSON.stringify(transactionReceipt, null, 4);
    }
}
