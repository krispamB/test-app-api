import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Candidate, Examiner } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCandidateDto } from './dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}
  async addCandidate(
    examiner: Examiner,
    dto: CreateCandidateDto,
    files: Array<Express.Multer.File>,
  ) {
    if (examiner.role !== 'ADMIN')
      throw new UnauthorizedException('You are not authorized');

    const result: string[] = await this.cloudinary.uploadFiles(
      files,
      dto.fullname,
    );

    const newCandidate: Candidate = await this.prisma.candidate.create({
      data: { images: result, ...dto },
    });

    return newCandidate;
  }

  async create() {
    await this.prisma.create();
  }

  async cleanDb() {
    await this.prisma.cleanDb();
  }
}
