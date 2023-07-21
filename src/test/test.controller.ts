import { Controller, Get, Param } from '@nestjs/common';
import { TestService } from './test.service';
import { GetActiveTestsResponse } from './test.responses';

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}
  faceVerify() {}

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
