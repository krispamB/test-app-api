import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from './test/test.module';
import { ExamModule } from './exam/exam.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule, TestModule, ExamModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
