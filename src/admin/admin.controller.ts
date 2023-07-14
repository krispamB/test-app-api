import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtGuard } from 'src/auth/Guard';
import { CreateCandidateDto } from './dto';
import { GetExaminer } from 'src/auth/decorator';
import { Examiner } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RolesDecorator } from './Decorator/role.decorator';
import { RolesGuard } from './Guard/role.guard';
import { GetCandidateResponse } from './admin.response';

@RolesDecorator('ADMIN')
@UseGuards(JwtGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('candidate')
  @UseInterceptors(FilesInterceptor('images'))
  addCandidate(
    @Body() dto: CreateCandidateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.adminService.addCandidate(dto, files);
  }

  @Get('candidate')
  getCandidates(): Promise<GetCandidateResponse> {
    return this.adminService.getCandidate();
  }

  @Get('candidate/:id')
  getCandidateById() {}

  @Get('examiners')
  getExaminers() {}

  @RolesDecorator('ADMIN')
  @UseGuards(RolesGuard)
  @Get('test')
  test() {
    return 'Amin route';
  }

  @Delete('clear')
  cleanDb() {
    return this.adminService.cleanDb();
  }
}
