import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { PrismaService } from 'src/prisma/prisma.service';

// Fix to handle BigInt
(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

@Injectable()
export class TransactionService {
    constructor(
        private prisma: PrismaService,
        private config: ConfigService,
    ) {}
    INFURA_API = this.config.get('INFURA_API');
    network = 'mainnet';
    provider = new ethers.InfuraProvider(this.network, this.INFURA_API);

    // Returns the transaction Hash for BlockHash
    async getTransactionHashByBlockHash(blockHash: string) {
        const transactionHashesForBlock = await this.prisma.block.findUnique({
            where: {
                hash: blockHash,
            },
            include: {
                TransactionReceipt: {
                    select: {
                        transactionHash: true,
                    },
                },
            },
        });
        return transactionHashesForBlock.TransactionReceipt.map(
            (tr) => tr.transactionHash,
        );
    }

    // Returns the transaction receipt for BlockHash
    async getTransactionReceiptByBlockHash(blockHash: string) {
        const transactionReceiptsForBlock = await this.prisma.block.findUnique({
            where: {
                hash: blockHash,
            },
            include: {
                TransactionReceipt: true,
            },
        });
        return transactionReceiptsForBlock.TransactionReceipt;
    }
}
