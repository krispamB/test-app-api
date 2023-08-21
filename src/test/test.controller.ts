import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TestService } from './test.service';
import { FaceVerifyResponse, GetActiveTestsResponse } from './test.responses';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CandidateJwtGuard } from './Guard';
import { CodeVerifyDto } from './dto/codeVerify.dto';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

  //return candidate for face recognition
  @Post('faceverify')
  @UseInterceptors(FileInterceptor('image'))
  faceVerify(@UploadedFile() file: Express.Multer.File) {
    return this.testService.faceVerify(file);
  }

  @Post('codeVerify')
  codeVerify(@Body() dto: CodeVerifyDto) {
    return this.testService.codeVerify(dto);
  }

  @UseGuards(CandidateJwtGuard)
  @Get()
  getActiveTests(): Promise<GetActiveTestsResponse> {
    return this.testService.getActiveTests();
  }

  @UseGuards(CandidateJwtGuard)
  @Get('get/:id')
  getTestById(@Param('id') examId: string) {
    return this.testService.getTestById(examId);
  }

  @UseGuards(CandidateJwtGuard)
  @Post()
  submitTest() {}
}
