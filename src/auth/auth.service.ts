import { ForbiddenException, Injectable } from '@nestjs/common';
import { Examiner, PrismaClient, Role } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { SignInDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SigninResponse, SignupResponse } from './auth.response';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(dto: SignupDto): Promise<SignupResponse> {
    const password: string = await argon.hash(dto.password);
    try {
      const examiner: Examiner = await this.prisma.examiner.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!examiner) {
        const createdExaminer: Examiner = await this.prisma.examiner.create({
          data: { ...dto, password },
        });

        delete createdExaminer.password;
        return createdExaminer;
      }
      throw new ForbiddenException('Email already taken');
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async signIn(dto: SignInDto): Promise<SigninResponse> {
    const user: Examiner = await this.prisma.examiner.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('User not found');

    const passwordMatch = await argon.verify(user.password, dto.password);

    if (!passwordMatch) throw new ForbiddenException('Wrong password');

    delete user.password;

    return {
      user,
      access_token: await this.signToken(user.id, user.email, user.role),
    };
  }

  async signToken(id: string, email: string, role: Role): Promise<string> {
    const payload = {
      sub: id,
      email,
      role,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_EXP_TIME'),
      secret: this.config.get('JWT_SECRET_KEY'),
    });

    return token;
  }
}
