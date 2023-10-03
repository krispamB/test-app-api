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
import { GetUser } from 'src/auth/decorator';
import { Exam } from '@prisma/client';
import { ExamService } from './exam.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Exam')
@Controller('exam')
export class ExamController {
  constructor(private examService: ExamService) {}

  @ApiCreatedResponse({ description: 'Record successfully created' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(JwtGuard)
  @Post('create')
  async createTest(
    @Body() dto: CreateTestDto,
    @GetUser('id') examinerId: string,
  ): Promise<Exam> {
    return await this.examService.createTest(dto, examinerId);
  }

  @UseGuards(JwtGuard)
  @Get('getAll')
  getCreatedTests(@GetUser('id') examinerId: string): Promise<Exam[]> {
    return this.examService.getCreatedTests(examinerId);
  }

  @UseGuards(UniversalJwtGuard)
  @Get('get/:id')
  getTestById(@Param('id') id: string) {
    return this.examService.getTestById(id);
  }

  @ApiCreatedResponse({ description: 'Record successfully updated' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseGuards(JwtGuard)
  @Patch('edit/:id')
  editExam(
    @GetUser('id') examinerId: string,
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
    @GetUser('id') examinerId: string,
    @Param('id') id: string,
  ): Promise<Object> {
    return this.examService.deleteExam(examinerId, id);
  }
}
