import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockDto, TransactionDto } from './dto';

@Controller('ethers')
export class BlockController {
    constructor(private ethersService: BlockService) {}

    @Get('block_number')
    getRecentBlockNumber() {
        return this.ethersService.getRecentBlockNumber();
    }

    @Post('block')
    retrieveEthersBlockData(@Body() dto: BlockDto) {
        return this.ethersService.retrieveEthersBlockData(dto);
    }

    @Post('transaction_receipt')
    getTransactionReceiptByHash(@Body() dto: TransactionDto) {
        return this.ethersService.getTransactionReceiptByHash(dto);
    }
}
