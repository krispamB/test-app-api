import { Examiner } from '@prisma/client';

export type SignupResponse = Examiner | Error;
export type SigninResponse = {
  user: Examiner;
  access_token: string;
};
