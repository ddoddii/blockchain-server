import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class BlockDto {
    @ApiPropertyOptional()
    @IsOptional()
    blockName?: string;

    @ApiProperty()
    blockHash?: number;

    @ApiPropertyOptional()
    @IsOptional()
    blockNumber?: number;
}
