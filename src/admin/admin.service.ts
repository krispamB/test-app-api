import { BadRequestException, Injectable } from '@nestjs/common';
import { Candidate } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCandidateDto } from './dto';
import {
  CreateEmergencyCodeResponse,
  GetCandidateByIdResponse,
  GetCandidateResponse,
  GetExaminersResponse,
  GetExamsResponses,
} from './admin.response';
import * as crypto from 'crypto';
import { FaceRecognitionService } from 'src/face-recognition/face-recognition.service';
import { CreatePerson } from 'src/face-recognition/face-recognition.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private face: FaceRecognitionService,
    private config: ConfigService,
  ) {}

  private CODE_LENGTH: number = 6;

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
      data: {
        fullname: dto.fullname,
        images: dto.images,
        matric_number: dto.matric_number,
      },
    });

    const createFaceData: CreatePerson = {
      id: newCandidate.id,
      name: newCandidate.fullname,
      images: dto.base64,
      gender: dto.gender,
      date_of_birth: dto.dateOfBirth,
      nationality: dto.nationality,
      collections: [this.config.get('COLLECTION_ID')],
      is_bulk_insert: false,
    };

    await this.face.createPerson(createFaceData);

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

  async deleteCandidate() {}

  async createEmergencyCode(
    candidateId: string,
  ): Promise<CreateEmergencyCodeResponse> {
    let code: string;
    code = await this.generateRandomCode(this.CODE_LENGTH);

    const candidate: Candidate = await this.prisma.candidate.update({
      where: {
        id: candidateId,
      },
      data: {
        emergencyCode: code,
      },
    });

    return {
      code,
    };
  }

  // utility functions
  private async generateRandomCode(length: number) {
    const buffer = crypto.randomBytes(Math.ceil(length / 2));
    const code = buffer.toString('hex').slice(0, length);
    return code;
  }

  async create() {
    await this.prisma.create();
  }

  async cleanDb() {
    await this.prisma.cleanDb();
  }
}
