import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/Guard';
import { CreateQuestionDto } from './dto';
import { GetExaminer } from 'src/auth/decorator';
import { Question } from '@prisma/client';
import { QuestionService } from './question.service';


@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @UseGuards(JwtGuard)
  @Post('create/:id')
  createQuestion(
    @Body() dto: CreateQuestionDto,
    @Param('id') examId: string,
  ): Promise<Question> {
    return this.questionService.createQuestion(dto, examId);
  }

  @Get('all/:id')
  getQuestion(@Param('id') examId: string): Promise<Question[]> {
    return this.questionService.getQuestion(examId)
  }
}
