import { Body, Controller, Get, Post } from '@nestjs/common';
import { EthersService } from './ethers.service';
import { BlockDto, TransactionDto } from './dto';

@Controller('ethers')
export class EthersController {
    constructor(private ethersService: EthersService) {}

    @Get('block_number')
    getRecentBlockNumber() {
        return this.ethersService.getRecentBlockNumber();
    }

    @Post('block')
    retrieveEthersBlockData(@Body() dto: BlockDto) {
        return this.ethersService.getEthersBlockData(dto);
    }

    @Post('transaction_receipt')
    getTransactionReceiptByHash(@Body() dto: TransactionDto) {
        return this.ethersService.getTransactionReceiptByHash(dto);
    }
}
