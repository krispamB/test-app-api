import { ForbiddenException, Injectable } from '@nestjs/common';
import { Examiner, PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signUp(dto: SignupDto): Promise<Object> {
    const password = await argon.hash(dto.password);
    try {
      const examiner = await this.prisma.examiner.create({
        data: {...dto, password},
      });
      delete examiner.password;
      return examiner;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('Cridentials taken');
      }
      throw error;
    }
  }
}
