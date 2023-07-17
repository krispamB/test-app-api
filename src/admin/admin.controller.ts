import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtGuard } from 'src/auth/Guard';
import { CreateCandidateDto } from './dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RolesDecorator } from './Decorator/role.decorator';
import { RolesGuard } from './Guard/role.guard';
import {
  GetCandidateByIdResponse,
  GetCandidateResponse,
  GetExaminersResponse,
  GetExamsResponses,
} from './admin.response';

@UseGuards(JwtGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @RolesDecorator('ADMIN')
  @UseGuards(RolesGuard)
  @Post('candidate')
  addCandidate(@Body() dto: CreateCandidateDto) {
    return this.adminService.addCandidate(dto);
  }

  @RolesDecorator('ADMIN')
  @UseGuards(RolesGuard)
  @Get('candidate')
  getCandidates(
    @Query('search') search: string,
  ): Promise<GetCandidateResponse> {
    return this.adminService.getCandidate(search);
  }

  @RolesDecorator('ADMIN')
  @UseGuards(RolesGuard)
  @Get('candidate/:id')
  getCandidateById(
    @Param('id') candidateId: string,
  ): Promise<GetCandidateByIdResponse> {
    return this.adminService.getCandidateById(candidateId);
  }

  @RolesDecorator('ADMIN')
  @UseGuards(RolesGuard)
  @Get('examiners')
  getExaminers(): Promise<GetExaminersResponse> {
    return this.adminService.getExaminers();
  }

  @RolesDecorator('ADMIN')
  @UseGuards(RolesGuard)
  @Get('exams')
  getCreatedExams(): Promise<GetExamsResponses> {
    return this.adminService.getCreatedExams();
  }

  @RolesDecorator('ADMIN')
  @UseGuards(RolesGuard)
  @Patch('candidate/:id')
  updateCandidate(@Param('id') candidateId: string) {
    return this.adminService.updateCandidates(candidateId);
  }

  @Delete('candidate')
  deleteCandidate() {}

  @RolesDecorator('ADMIN')
  @UseGuards(RolesGuard)
  @Get('test')
  test() {
    return 'Amin route';
  }

  @RolesDecorator('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('clear')
  cleanDb() {
    return this.adminService.cleanDb();
  }
}
