import { Body, Controller, Get, Param } from '@nestjs/common';
import { TestService } from './test.service';
import { FaceVerifyResponse, GetActiveTestsResponse } from './test.responses';
import { FaceVerifyDto } from './dto';

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

  @Get('faceverify')
  faceVerify(@Body() dto: FaceVerifyDto): Promise<FaceVerifyResponse> {
    return this.testService.faceVerify(dto);
  }

  codeVerify() {}

  @Get()
  getActiveTests(): Promise<GetActiveTestsResponse> {
    return this.testService.getActiveTests();
  }

  @Get('get/:id')
  getTestById(@Param('id') examId: string) {
    return this.testService.getTestById(examId);
  }

  submitTest() {}
}
