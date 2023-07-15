import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Candidate, Examiner } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCandidateDto } from './dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { GetCandidateResponse } from './admin.response';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}
  async addCandidate(
    dto: CreateCandidateDto,
    files: Array<Express.Multer.File>,
  ) {
    const result: string[] = await this.cloudinary.uploadFiles(
      files,
      dto.fullname,
    );

    const newCandidate: Candidate = await this.prisma.candidate.create({
      data: { images: result, ...dto },
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

  async create() {
    await this.prisma.create();
  }

  async cleanDb() {
    await this.prisma.cleanDb();
  }
}
