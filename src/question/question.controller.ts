import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/Guard';
import { CreateQuestionDto, Option, UpdateQuestionDto } from './dto';
import { GetExaminer } from 'src/auth/decorator';
import { Question } from '@prisma/client';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('create/:id')
  createQuestion(
    @Body() dto: CreateQuestionDto,
    @Param('id') examId: string,
  ): Promise<Question> {
    return this.questionService.createQuestion(dto, examId);
  }

  @Get('all/:id')
  getQuestion(@Param('id') examId: string): Promise<Question[]> {
    return this.questionService.getQuestion(examId);
  }

  @Get('options/:id')
  getOptions(@Param('id') questionId: string): Promise<Option[]> {
    return this.questionService.getOptions(questionId);
  }

  @UseGuards(JwtGuard)
  @Patch('edit/:id')
  updateQuestion(
    @Body() dto: UpdateQuestionDto,
    @Param('id') questionId: string,
  ): Promise<Question> {
    return this.questionService.updateQuestion(dto, questionId);
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  deleteQuestion(
    @Param('id') questionId: string,
  ): Promise<{success: boolean, message: string}> {
    return this.questionService.deleteQuestion(questionId);
  }
}
