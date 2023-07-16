import { Candidate, Exam, Examiner } from '@prisma/client';

export type GetCandidateResponse = Candidate[];
export type GetCandidateByIdResponse = Candidate;
export type GetExaminersResponse = Examiner[];
export type GetExamsResponses = Exam[];
