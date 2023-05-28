import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { SignInDto } from './dto/signin';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(dto: SignupDto): Promise<Object> {
    const password = await argon.hash(dto.password);
    try {
      const examiner = await this.prisma.examiner.create({
        data: { ...dto, password },
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

  async signIn(dto: SignInDto): Promise<Object> {
    const user = await this.prisma.examiner.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('User not found');

    const passwordMatch = await argon.verify(user.password, dto.password);

    if (!passwordMatch) throw new ForbiddenException('Wrong password');

    delete user.password;

    return { user, access_token: await this.signToken(user.id, user.email) };
  }

  async signToken(id: string, email: string): Promise<string> {
    const payload = {
      sub: id,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_EXP_TIME'),
      secret: this.config.get('JWT_SECRET_KEY'),
    });

    return token;
  }
}
