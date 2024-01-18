import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { ConfigService } from '@nestjs/config';
import { BlockDto } from 'src/block/dto';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            }),
        );
        await app.init();
        await app.listen(3334);

        prisma = app.get(PrismaService);
        pactum.request.setBaseUrl('http://localhost:3334');
    });

    afterAll(async () => {
        app.close();
    });

    describe('Block', () => {
        // 최신 블럭 넘버 조회 테스트
        it('should return recent block number', () => {
            return pactum
                .spec()
                .get('/block/block_number')
                .expectStatus(200)
                .expect((res) => {
                    console.log(res.res.body);
                    if (res.res.body.length !== 8)
                        throw new Error(
                            'Expected body to be an 8-digit block number',
                        );
                });
        });
    });
});
