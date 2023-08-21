import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy';
import { FaceRecognitionModule } from 'src/face-recognition/face-recognition.module';
import { FaceRecognitionService } from 'src/face-recognition/face-recognition.service';

@Module({
  imports: [HttpModule, JwtModule.register({})],
  providers: [FaceRecognitionService, JwtStrategy],
})
export class AdminModule {}
