import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Candidate } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CandidateJwtStrategy extends PassportStrategy(
  Strategy,
  'candidate-jwt',
) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: { sub: string; email: string }): Promise<Object> {
    const candidate: Candidate = await this.prisma.candidate.findUnique({
      where: {
        id: payload.sub,
      },
    });

    return candidate;
  }
}
