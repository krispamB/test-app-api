import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  test(): String {
    return 'This is a test route';
  }

}
