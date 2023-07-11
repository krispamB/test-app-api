import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  async create() {
    return this.$transaction([
      this.examiner.create({
        data: {
          email: this.config.get('ADMIN_EMAIL'),
          password: await argon.hash(this.config.get('ADMIN_PASSWORD')),
          name: 'Admin',
          surname: 'User',
          faculty: 'Faculty',
          department: 'Department',
          role: 'ADMIN',
        },
      }),
    ]);
  }

  cleanDb() {
    return this.$transaction([
      this.candidate.deleteMany(),
      this.option.deleteMany(),
      this.option.deleteMany(),
      this.exam.deleteMany(),
      this.examiner.deleteMany(),
    ]);
  }
}
