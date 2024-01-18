import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { BlockController } from './block/block.controller';
import { BlockService } from './block/block.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        TransactionModule,
    ],
    controllers: [BlockController],
    providers: [AppService, BlockService, PrismaService],
})
export class AppModule {}
