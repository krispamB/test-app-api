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
import { JwtGuard, UniversalJwtGuard } from 'src/auth/Guard';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { Question, Option } from '@prisma/client';
import { QuestionService } from './question.service';
import { CreateQuestionResponse } from './question.response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Question')
@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('create/:id')
  createQuestion(
    @Body() dto: CreateQuestionDto,
    @Param('id') examId: string,
  ): Promise<CreateQuestionResponse> {
    return this.questionService.createQuestion(dto, examId);
  }

  @UseGuards(UniversalJwtGuard)
  @Get('all/:id')
  getQuestion(@Param('id') examId: string): Promise<Question[]> {
    return this.questionService.getQuestion(examId);
  }

  @UseGuards(UniversalJwtGuard)
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
  ): Promise<{ success: boolean; message: string }> {
    return this.questionService.deleteQuestion(questionId);
  }
}
