import {
  BadRequestException,
  ForbiddenException,
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
import { CodeVerifyDto } from './dto/codeVerify.dto';
import { FaceRecognitionService } from 'src/face-recognition/face-recognition.service';
import { FindPerson } from 'src/face-recognition/face-recognition.response';
import { Candidate } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

/*Update candidate table to contain an emergencyCode field that is a null value by default
 create an emergencyCode function that creates a 6 digit code and patches the candidate 
  the student signs in by using the code given to them*/

@Injectable()
export class TestService {
  constructor(
    private prisma: PrismaService,
    private face: FaceRecognitionService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async faceVerify(file: Express.Multer.File) {
    const image: string = file.buffer.toString('base64');
    return await this.face
      .searchStorage(image)
      .then(async (res: FindPerson) => {
        if (res.length === 0) {
          return new NotFoundException('Face not found');
        } else {
          let id = res[0].id;

          const candidate: Candidate = await this.prisma.candidate.findUnique({
            where: {
              id,
            },
          });

          return {
            name: candidate.fullname,
            mat_no: candidate.matric_number,
            access_token: await this.signToken(
              candidate.id,
              candidate.matric_number,
            ),
          };
        }
      });
  }

  async codeVerify(dto: CodeVerifyDto) {
    const candidate: Candidate = await this.prisma.candidate.findFirst({
      where: {
        emergencyCode: {
          contains: dto.code,
        },
      },
    });

    if (!candidate) {
      throw new NotFoundException('Code not found');
    }

    const token: string = await this.signToken(
      candidate.id,
      candidate.matric_number,
    );

    await this.prisma.candidate.update({
      where: {
        id: candidate.id,
      },
      data: {
        emergencyCode: null,
      },
    });

    return {
      name: candidate.fullname,
      mat_no: candidate.matric_number,
      access_token: token,
    };
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

  //Utils functions
  async signToken(id: string, mat_no: string): Promise<string> {
    const payload = {
      sub: id,
      mat_no,
    };

    return await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_EXP_TIME'),
      secret: this.config.get('JWT_SECRET_KEY'),
    });
  }
}
