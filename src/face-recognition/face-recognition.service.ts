import { HttpService } from '@nestjs/axios';
import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom, map, tap } from 'rxjs';
import { CompareImagesDto } from './dto/compareImages.dto';
import { CreatePerson } from './face-recognition.types';
import { FindPerson } from './face-recognition.response';

@Injectable()
export class FaceRecognitionService {
  constructor(private http: HttpService, private config: ConfigService) {}

  private readonly logger = new Logger(FaceRecognitionService.name);

  private baseUrl: string = this.config.get('OPEN_CV_API_URL');
  private key: string = this.config.get('OPEN_CV_API_KEY');
  private requestConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': this.key,
    },
  };

  async createPerson(person: CreatePerson) {
    const url: string = this.baseUrl + '/person';
    const { data } = await firstValueFrom(
      this.http.post(url, person, this.requestConfig).pipe(
        catchError((err: AxiosError) => {
          this.logger.error(err.response.data);
          throw new ForbiddenException('API not available');
        }),
      ),
    );

    return data
  }

  async getImageAsBase64(imgUrls: string[]): Promise<string[]> {
    const base64Images = await Promise.all(
      imgUrls.map(async (imgUrl) => {
        try {
          const response = await firstValueFrom(
            this.http
              .get(imgUrl, {
                responseType: 'arraybuffer',
              })
              .pipe(
                catchError(() => {
                  throw new ForbiddenException('API not available');
                }),
              ),
          );

          if (response.status === 200) {
            const imageBuffer = Buffer.from(response.data, 'binary');
            const base64Image = imageBuffer.toString('base64');
            return base64Image;
          } else {
            throw new NotFoundException(
              `Error downloading image from ${imgUrl}`,
            );
          }
        } catch (error) {
          throw new ForbiddenException('API not available');
        }
      }),
    );

    return base64Images;
  }

  async searchStorage(base64String: string): Promise<FindPerson> {
    const url: string = this.baseUrl + '/search';
    const postData = {
      collection_id: this.config.get('COLLECTION_iD'),
      images: [base64String],
      max_results: 1,
      min_score: 0.7,
      search_mode: 'FAST',
    };

    const { data } = await firstValueFrom(
      this.http.post(url, postData, this.requestConfig).pipe(
        catchError((err: AxiosError) => {
          this.logger.error(err.response.data);
          throw new ForbiddenException('API not available');
        }),
      ),
    );

    return data;
  }

  async compareImages(gallery: string[], probe: string) {
    const url: string = this.baseUrl + '/compare';
    console.log(url);
    const postData: CompareImagesDto = {
      gallery: gallery,
      probe: [probe],
      search_mode: 'FAST',
    };

    const { data } = await firstValueFrom(
      this.http.post(url, postData, this.requestConfig).pipe(
        catchError((err: AxiosError) => {
          this.logger.error(err.response.data);
          throw new ForbiddenException('API not available');
        }),
      ),
    );

    return data;
  }
}
