import { Module } from '@nestjs/common';
import { FaceRecognitionService } from './face-recognition.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  exports: [FaceRecognitionService],
  providers: [FaceRecognitionService],
})
export class FaceRecognitionModule {}
