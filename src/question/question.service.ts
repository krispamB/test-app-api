import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { Question, Option } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionResponse } from './question.response';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}
  async createQuestion(
    dto: CreateQuestionDto,
    examId: string,
  ): Promise<CreateQuestionResponse> {
    const question: Question = await this.prisma.question.create({
      data: { question: dto.question, examId },
    });

    if (!question) throw new BadRequestException('An error occurred');

    const createdOptions: Option[] = [];

    for (const option of dto.options) {
      const added: Option = await this.prisma.option.create({
        data: { examId, questionId: question.id, ...option },
      });

      if (!added) {
        await this.deleteQuestion(question.id);
        throw new BadRequestException('Option not uploaded');
      }

      createdOptions.push(added);
    }

    return {
      question,
      options: createdOptions,
    };
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

  async deleteQuestion(
    questionId: string,
  ): Promise<{ success: boolean; message: string }> {
    const successDelete: Question = await this.prisma.question.delete({
      where: {
        id: questionId,
      },
    });
    if (!successDelete) {
      throw new BadRequestException(
        'An error occurred while deleting question',
      );
    }
    return {
      success: true,
      message: 'Question deleted successfully',
    };
  }

  shuffleQuestions(arr: Question[]): Question[] {
    const n = arr.length;
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
