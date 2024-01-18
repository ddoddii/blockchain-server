import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService) {}

    // Transaction Hash 기준으로 Transaction Receipt 조회
    @Get('hash/:transactionHash')
    getTransactionReceiptByTransactionHash(
        @Param('transactionHash') transactionHash: string,
    ) {
        return this.transactionService.getTransactionReceiptByTransactionHash(
            transactionHash,
        );
    }

    // From Address 기준으로 Transaction Receipt 조회
    @Get('from/:fromAddress')
    getTransactionReceiptByFromAddress(
        @Param('fromAddress') fromAddress: string,
    ) {
        return this.transactionService.getTransactionReceiptByFromAddress(
            fromAddress,
        );
    }

    // To Address 기준으로 Transaction Receipt 조회
    @Get('to/:toAddress')
    getTransactionReceiptByToAddress(@Param('toAddress') toAddress: string) {
        return this.transactionService.getTransactionReceiptByToAddress(
            toAddress,
        );
    }
}
