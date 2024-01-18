import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { EthersController } from './ethers/ethers.controller';
import { EthersService } from './ethers/ethers.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
    ],
    controllers: [EthersController],
    providers: [AppService, EthersService, PrismaService],
})
export class AppModule {}
