import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/Guard';
import { CreateTestDto } from './dto';
import { GetExaminer } from 'src/auth/decorator';
import { Exam } from '@prisma/client';
import { ExamService } from './exam.service';

@UseGuards(JwtGuard)
@Controller('exam')
export class ExamController {
  constructor(private examService: ExamService) {}
  @Post('create')
  async createTest(
    @Body() dto: CreateTestDto,
    @GetExaminer('id') examinerId: string,
  ): Promise<Exam> {
    return await this.examService.createTest(dto, examinerId);
  }

  @Get('getAll')
  getCreatedTests(@GetExaminer('id') examinerId: string): Promise<Exam[]> {
    return this.examService.getCreatedTests(examinerId);
  }

  @Get('get/:id')
  getTestById(@Param('id') id: string) {
    return this.examService.getTestById(id)
  }
}
