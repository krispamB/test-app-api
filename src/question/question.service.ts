import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto, Option, UpdateQuestionDto } from './dto';
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
      const added: Option = await this.prisma.option.create({
        data: { examId, questionId: question.id, ...option },
      });
      if (!added) throw new BadRequestException('Option not uploaded');
      // delete question created
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

  async getOptions(questionId: string): Promise<Option[]> {
    const options: Option[] = await this.prisma.option.findMany({
      where: {
        questionId,
      },
    });

    return options;
  }

  async updateQuestion(
    dto: UpdateQuestionDto,
    questionId: string,
  ): Promise<Question> {
    const updatedQuestion: Question = await this.prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        question: dto.question,
      },
    });

    if (!updatedQuestion)
      throw new BadRequestException(
        'An error occurred while updating question',
      );

    return updatedQuestion;
  }

  async deleteQuestion() {}

  shuffleQuestions(arr: Question[]): Question[] {
    const n = arr.length;
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
