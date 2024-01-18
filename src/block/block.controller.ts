import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BlockService } from './block.service';
import { BlockDto } from './dto';

@Controller('block')
export class BlockController {
    constructor(private blockService: BlockService) {}

    // 최신 블럭 넘버 조회
    @ApiResponse({
        status: 200,
        description: '최신 블럭 넘버 조회 성공',
    })
    @Get('block_number')
    getRecentBlockNumber() {
        return this.blockService.getRecentBlockNumber();
    }

    // (blockName | blockNumber | blockHash ) 기준으로 블럭 정보 조회 & 데이터베이스에 저장
    @ApiResponse({
        status: 201,
        description:
            '(blockName or blockNumber or blockHash ) 기준으로 블럭 정보 조회 & 데이터베이스에 저장 성공',
    })
    @Post('info')
    retrieveEthersBlockData(@Body() dto: BlockDto) {
        return this.blockService.retrieveEthersBlockData(dto);
    }

    // 블럭해시 기준으로 블럭 조회 (TransactionReceipt, Log 포함)
    @ApiResponse({
        status: 200,
        description: '블럭 해시 기준으로 블럭 정보 조회 성공',
    })
    @Get(':blockHash')
    getBlockDataOnBlockHash(@Param('blockHash') blockHash: string) {
        return this.blockService.getBlockData(blockHash);
    }
}
