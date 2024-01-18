import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockDto } from './dto';

@Controller('block')
export class BlockController {
    constructor(private blockService: BlockService) {}

    @Get('block_number')
    getRecentBlockNumber() {
        return this.blockService.getRecentBlockNumber();
    }

    @Post('info')
    retrieveEthersBlockData(@Body() dto: BlockDto) {
        return this.blockService.retrieveEthersBlockData(dto);
    }

    @Get(':blockHash')
    getBlockDataOnBlockHash(@Param('blockHash') blockHash: string) {
        return this.blockService.getBlockData(blockHash);
    }
}
