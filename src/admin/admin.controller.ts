import {
  Body,
  Controller,
  Delete,
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

@UseGuards(JwtGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('candidate')
  @UseInterceptors(FilesInterceptor('images'))
  addCandidate(
    @GetExaminer() examiner: Examiner,
    @Body() dto: CreateCandidateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.adminService.addCandidate(examiner, dto, files);
  }

  @Post('create')
  create() {
    return this.adminService.create();
  }

  @Delete('clear')
  cleanDb() {
    return this.adminService.cleanDb();
  }
}
