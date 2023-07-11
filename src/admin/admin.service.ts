import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  async create() {
    await this.prisma.create()
  } 

  async cleanDb() {
    await this.prisma.cleanDb();
  }
}
