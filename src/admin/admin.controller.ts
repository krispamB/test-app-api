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
import { RolesDecorator } from './Decorator/role.decorator';
import { RolesGuard } from './Guard/role.guard';
import {
  CreateEmergencyCodeResponse,
  GetCandidateByIdResponse,
  GetCandidateResponse,
  GetExaminersResponse,
  GetExamsResponses,
} from './admin.response';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Admin')
@UseGuards(JwtGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @RolesDecorator('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(FilesInterceptor('files'))
  @Post('candidate')
  addCandidate(
    @Body() dto: CreateCandidateDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.adminService.addCandidate(dto, files);
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

  @RolesDecorator('ADMIN')
  @UseGuards(RolesGuard)
  @Patch('code/:id')
  createEmergencyCode(
    @Param('id') candidateId: string,
  ): Promise<CreateEmergencyCodeResponse> {
    return this.adminService.createEmergencyCode(candidateId);
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
  @Post('create')
  create() {
    return this.adminService.create();
  }

  @RolesDecorator('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('clear')
  cleanDb() {
    return this.adminService.cleanDb();
  }
}
