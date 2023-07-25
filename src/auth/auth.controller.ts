import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto';
import { SignInDto } from './dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SigninResponse, SignupResponse } from './auth.response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'Created user object response',
  })
  @ApiForbiddenResponse({
    description: 'Credentials taken response',
  })
  @Post('signup')
  signUp(@Body() dto: SignupDto): Promise<SignupResponse> {
    return this.authService.signUp(dto);
  }

  @ApiOkResponse({
    description: 'User signin success',
  })
  @ApiForbiddenResponse({
    description: 'Wrong credentials',
  })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() dto: SignInDto): Promise<SigninResponse> {
    return this.authService.signIn(dto);
  }
}
