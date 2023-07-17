import { BadRequestException, Injectable } from '@nestjs/common';
import { Candidate } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCandidateDto } from './dto';
import {
  GetCandidateByIdResponse,
  GetCandidateResponse,
  GetExaminersResponse,
  GetExamsResponses,
} from './admin.response';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  async addCandidate(dto: CreateCandidateDto) {
    const candidateExists = await this.prisma.candidate.findUnique({
      where: {
        matric_number: dto.matric_number,
      },
    });

    if (candidateExists) {
      throw new BadRequestException('Candidate already exists');
    }

    const newCandidate: Candidate = await this.prisma.candidate.create({
      data: dto,
    });

    return newCandidate;
  }

  async getCandidate(search: string): Promise<GetCandidateResponse> {
    const keywords = search ? search : '';

    const candidates = await this.prisma.candidate.findMany({
      where: {
        matric_number: {
          contains: keywords,
          mode: 'insensitive',
        },
      },
    });

    return candidates;
  }

  async getCandidateById(
    candidateId: string,
  ): Promise<GetCandidateByIdResponse> {
    return await this.prisma.candidate.findUnique({
      where: {
        id: candidateId,
      },
    });
  }

  async getExaminers(): Promise<GetExaminersResponse> {
    return await this.prisma.examiner.findMany();
  }

  async getCreatedExams(): Promise<GetExamsResponses> {
    return await this.prisma.exam.findMany();
  }

  async updateCandidates(candidateId: string) {
    //delete images from cloudinary
    //update db with new image string
    //
  }

  async create() {
    await this.prisma.create();
  }

  async cleanDb() {
    await this.prisma.cleanDb();
  }
}
