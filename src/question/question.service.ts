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
  ): Promise<Question> {
    const question: Question = await this.prisma.question.create({
      data: { question: dto.question, examId },
    });

    if (!question) throw new BadRequestException('An error occurred');

    dto.options.map(async (option: Option) => {
      await this.prisma.option.create({
        data: { examId, questionId: question.id, ...option },
      });
    });

    return question;
  }

  async getQuestion(examId: string): Promise<Question[]> {
    const questions: Question[] = await this.prisma.question.findMany({
      where: {
        examId,
      },
    });

    return this.shuffleQuestions(questions);
  }

  shuffleQuestions<T>(arr: Question[]): Question[] {
    const n = arr.length;
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
