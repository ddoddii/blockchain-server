import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InfuraProvider, ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { BlockDto, TransactionDto } from './dto';

@Injectable()
export class EthersService {
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

    async getEthersBlockData(dto: BlockDto) {
        const blockinfo = await this.provider.getBlock(dto.blockName);
        return JSON.stringify(blockinfo, null, 4);
    }

    // Returns the transaction receipt for hash or null if the transaction has not been mined.
    async getTransactionReceiptByHash(dto: TransactionDto) {
        const transactionReceipt = await this.provider.getTransactionReceipt(
            dto.transactionHash,
        );
        return JSON.stringify(transactionReceipt, null, 4);
    }
}
