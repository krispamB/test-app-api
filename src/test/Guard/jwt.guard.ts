import { AuthGuard } from '@nestjs/passport';

export class CandidateJwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
