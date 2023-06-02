import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTestDto, editTestDto } from './dto';
import { Exam } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}
  async createTest(dto: CreateTestDto, examinerId: string): Promise<Exam> {
    const exam = await this.prisma.exam.create({
      data: { ...dto, examinerId },
    });

    if (!exam)
      throw new BadRequestException('THeir was a problem creating the test');

    return exam;
  }

  async getCreatedTests(examinerId: string): Promise<Exam[]> {
    const exams = await this.prisma.exam.findMany({
      where: {
        examinerId,
      },
    });

    return exams;
  }

  async getTestById(id: string): Promise<Exam> {
    const exam = await this.prisma.exam.findUnique({
      where: {
        id,
      },
    });

    if (!exam)
      throw new BadRequestException('Could not find a test with the given ID');

    return exam;
  }

  async editExam(
    examinerId: string,
    id: string,
    dto: editTestDto,
  ): Promise<object> {
    const updateExam = await this.prisma.exam.updateMany({
      where: {
        id,
        examinerId,
      },
      data: dto,
    });

    if (updateExam.count == 0)
      throw new BadRequestException('Their was a problem updating the test');

    return {
      success: true,
      message: 'Your test was updated',
    };
  }

  //Remember to add special delete when I add Questions and Options Model

  async deleteExam(examinerId: string, id: string): Promise<Object> {
    const examDelete = await this.prisma.exam.deleteMany({
      where: {
        examinerId,
        id,
      },
    });

    if (examDelete.count === 0)
      throw new BadRequestException('Their was a problem deleting the test');

    return {
      success: true,
      message: 'The test was deleted successfully',
    };
  }
}
