import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService) {}

    // Transaction Hash 기준으로 Transaction Receipt 조회
    @ApiResponse({
        status: 200,
        description: 'Transaction Hash 기준으로 Transaction Receipt 조회 성공',
    })
    @Get('hash/:transactionHash')
    getTransactionReceiptByTransactionHash(
        @Param('transactionHash') transactionHash: string,
    ) {
        return this.transactionService.getTransactionReceiptByTransactionHash(
            transactionHash,
        );
    }

    // From Address 기준으로 Transaction Receipt 조회
    @ApiResponse({
        status: 200,
        description: 'From Address 기준으로 Transaction Receipt 조회 성공',
    })
    @Get('from/:fromAddress')
    getTransactionReceiptByFromAddress(
        @Param('fromAddress') fromAddress: string,
    ) {
        return this.transactionService.getTransactionReceiptByFromAddress(
            fromAddress,
        );
    }

    // To Address 기준으로 Transaction Receipt 조회
    @ApiResponse({
        status: 200,
        description: 'To Address 기준으로 Transaction Receipt 조회 성공',
    })
    @Get('to/:toAddress')
    getTransactionReceiptByToAddress(@Param('toAddress') toAddress: string) {
        return this.transactionService.getTransactionReceiptByToAddress(
            toAddress,
        );
    }
}
