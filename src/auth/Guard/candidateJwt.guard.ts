import { AuthGuard } from '@nestjs/passport';

export class CandidateJwtGuard extends AuthGuard('candidate-jwt') {
  constructor() {
    super();
  }
}
