import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto';
import { Exam } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}
  async createTest(dto: CreateTestDto, examinerId: string): Promise<Exam> {
    const exam = await this.prisma.exam.create({
      data: { ...dto, examinerId },
    });

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
}
