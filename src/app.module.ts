import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from './test/test.module';
import { ExamModule } from './exam/exam.module';
import { QuestionModule } from './question/question.module';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    TestModule,
    ExamModule,
    QuestionModule,
    AdminModule,
    CloudinaryModule,
  ],
  controllers: [AppController, AdminController],
  providers: [AppService, PrismaService, AdminService],
})
export class AppModule {}
