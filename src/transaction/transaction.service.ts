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

    // Transaction Hash 기준으로 Transaction Receipt (Logs 포함) 조회
    async getTransactionReceiptByTransactionHash(transactionHash: string) {
        const transactionReceipt =
            await this.prisma.transactionReceipt.findUnique({
                where: {
                    transactionHash: transactionHash,
                },
                include: {
                    Log: true,
                },
            });
        return transactionReceipt;
    }

    // from 기준으로 Transaction Receipt (Logs 포함) 조회
    async getTransactionReceiptByFromAddress(fromAddress: string) {
        const transactionReceipt =
            await this.prisma.transactionReceipt.findMany({
                where: {
                    from: fromAddress,
                },
                include: {
                    Log: true,
                },
            });
        return transactionReceipt;
    }

    // to 기준으로 Transaction Receipt (Logs 포함) 조회
    async getTransactionReceiptByToAddress(toAddress: string) {
        const transactionReceipt =
            await this.prisma.transactionReceipt.findMany({
                where: {
                    to: toAddress,
                },
                include: {
                    Log: true,
                },
            });
        return transactionReceipt;
    }
}
