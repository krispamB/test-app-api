import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetActiveTestsResponse, GetTestByIdResponse } from './test.responses';

@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}

  async getActiveTests(): Promise<GetActiveTestsResponse> {
    const activeTests = await this.prisma.exam.findMany({
      where: {
        isActive: true,
      },
    });

    return activeTests;
  }

  async getTestById(id: string): Promise<GetTestByIdResponse> {
    const exam = await this.prisma.exam.findUnique({
      where: {
        id,
      },
    });

    if (!exam)
      throw new BadRequestException('Could not find a test with the given ID');

    return exam;
  }
}
