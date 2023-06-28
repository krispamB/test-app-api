import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto, Option } from './dto';
import { Question } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}
  async createQuestion(
    dto: CreateQuestionDto,
    examId: string,
  ): Promise<Question>{
    const question = await this.prisma.question.create({
      data: { question: dto.question, examId },
    });

    if (!question) throw new BadRequestException('An error occured');

    dto.options.map(async (option: Option) => {
      await this.prisma.option.create({
        data: { examId, questionId: question.id, ...option },
      });
    });

    return question
  }

  async getQuestion() {
    return 'success'
  }
}
