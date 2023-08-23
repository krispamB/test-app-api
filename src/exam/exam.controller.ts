import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard, UniversalJwtGuard } from 'src/auth/Guard';
import { CreateTestDto, editTestDto } from './dto';
import { GetExaminer } from 'src/auth/decorator';
import { Exam } from '@prisma/client';
import { ExamService } from './exam.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Exam')
@Controller('exam')
export class ExamController {
  constructor(private examService: ExamService) {}
  @UseGuards(JwtGuard)
  @Post('create')
  async createTest(
    @Body() dto: CreateTestDto,
    @GetExaminer('id') examinerId: string,
  ): Promise<Exam> {
    return await this.examService.createTest(dto, examinerId);
  }

  @UseGuards(JwtGuard)
  @Get('getAll')
  getCreatedTests(@GetExaminer('id') examinerId: string): Promise<Exam[]> {
    return this.examService.getCreatedTests(examinerId);
  }

  @UseGuards(UniversalJwtGuard)
  @Get('get/:id')
  getTestById(@Param('id') id: string) {
    return this.examService.getTestById(id);
  }

  @UseGuards(JwtGuard)
  @Patch('edit/:id')
  editExam(
    @GetExaminer('id') examinerId: string,
    @Param('id') id: string,
    @Body() dto: editTestDto,
  ): Promise<object> {
    return this.examService.editExam(examinerId, id, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('isActive/:id')
  editIsActive(@Param('id') examId: string): Promise<Exam> {
    return this.examService.editIsActive(examId);
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  deleteExam(
    @GetExaminer('id') examinerId: string,
    @Param('id') id: string,
  ): Promise<Object> {
    return this.examService.deleteExam(examinerId, id);
  }
}
