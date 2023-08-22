import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FaceRecognitionService } from 'src/face-recognition/face-recognition.service';

@Module({
  imports: [HttpModule],
  providers: [FaceRecognitionService],
})
export class AdminModule {}
