import { LogDataDto } from 'src/log/dto';

export class TransactionDto {
    transactionHash?: string;
    blockHash?: string;
    blockNumber?: number;
    to?: string;
    from?: string;
    contractAddress?: string;
    transactionIndex?: number;
    gasUsed?: bigint;
    logsBloom?: string;
    cumulativeGasUsed?: bigint;
    status?: number;
    logs?: LogDataDto[];
}
