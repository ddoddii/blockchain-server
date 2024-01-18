import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto';

@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService) {}

    // GET transaction receipts for given blockHash
    @Get('/receipt/:blockHash')
    getTransactionReceiptByBlockHash(@Param('blockHash') blockHash: string) {
        return this.transactionService.getTransactionReceiptByBlockHash(
            blockHash,
        );
    }

    // GET transaction hashes for given blockHash
    @Get('/hash/:blockHash')
    getTransactionHashByBlockHash(@Param('blockHash') blockHash: string) {
        return this.transactionService.getTransactionHashByBlockHash(blockHash);
    }
}
