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
import { CodeVerifyDto } from './dto/codeVerify.dto';
import { CandidateJwtGuard } from 'src/auth/Guard';
import { SubmitTestDto } from './dto';
import { GetUser } from 'src/auth/decorator';

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
  @Post('submit/:id')
  submitTest(
    @Param('id') examId: string,
    @Body() dto: SubmitTestDto,
    @GetUser('id') candidateId: string,
    @GetUser('matric_number') matric_number: string,
  ) {
    return this.testService.submitTest(examId, dto, candidateId, matric_number);
  }
}
