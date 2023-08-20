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
import { CodeVerifyDto } from './dto/codeVerify.dto';
import { FaceRecognitionService } from 'src/face-recognition/face-recognition.service';
import { FindPerson } from 'src/face-recognition/face-recognition.response';

/*Update candidate table to contain an emergencyCode field that is a null value by default
 create an emergencyCode function that creates a 6 digit code and patches the candidate 
  the student signs in by using the code given to them*/

@Injectable()
export class TestService {
  constructor(
    private prisma: PrismaService,
    private face: FaceRecognitionService,
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

          return await this.prisma.candidate.findUnique({
            where: {
              id,
            },
          });
        }
      });
  }

  async faceVerifyII() {}

  async test() {}

  async codeVerify(dto: CodeVerifyDto) {}

  async startSession() {}

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
