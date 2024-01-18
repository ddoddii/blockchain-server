import { Module } from '@nestjs/common';
import { EthersController } from './block.controller';
import { EthersService } from './block.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [EthersController],
    providers: [EthersService],
})
export class EthersModule {}
