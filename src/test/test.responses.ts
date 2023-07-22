import { Candidate, Exam } from '@prisma/client';

export type GetActiveTestsResponse = Exam[];
export type GetTestByIdResponse = Exam;
export type FaceVerifyResponse = Candidate | Error;
export type SubmitTestResponse = number;
