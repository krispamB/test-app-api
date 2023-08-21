import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, JwtStrategy],
  imports: [JwtModule.register({})],
})
export class QuestionModule {}
