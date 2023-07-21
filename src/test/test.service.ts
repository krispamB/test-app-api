import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  FaceVerifyResponse,
  GetActiveTestsResponse,
  GetTestByIdResponse,
} from './test.responses';
import { FaceVerifyDto } from './dto';

@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}

  async faceVerify(dto: FaceVerifyDto): Promise<FaceVerifyResponse> {
    const candidate = await this.prisma.candidate.findMany({
      where: {
        matric_number: {
          contains: dto.matric_number,
          mode: 'insensitive',
        },
      },
    });

    if (candidate.length < 1)
      return new NotFoundException('Candidate not found');

    return candidate[0];
  }

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
