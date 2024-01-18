import { Module } from '@nestjs/common';
import { EthersController } from './ethers.controller';
import { EthersService } from './ethers.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [EthersController],
    providers: [EthersService],
})
export class EthersModule {}
