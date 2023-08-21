import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [ExamController],
  providers: [ExamService, JwtStrategy],
  imports: [JwtModule.register({})],
})
export class ExamModule {}
