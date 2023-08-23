import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Candidate } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UniversalStrategy extends PassportStrategy(Strategy, 'universal') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: { sub: string; email: string }): Promise<Object> {
    const user = await this.prisma.examiner.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      const candidate: Candidate = await this.prisma.candidate.findUnique({
        where: {
          id: payload.sub,
        },
      });

      return candidate;
    } else return user;
  }
}
