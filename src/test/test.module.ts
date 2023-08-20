import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { FaceRecognitionService } from 'src/face-recognition/face-recognition.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [TestController],
  providers: [TestService, FaceRecognitionService],
})
export class TestModule {}
