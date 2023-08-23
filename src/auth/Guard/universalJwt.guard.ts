import { AuthGuard } from '@nestjs/passport';

export class UniversalJwtGuard extends AuthGuard('universal') {
  constructor() {
    super();
  }
}
