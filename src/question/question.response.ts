import { Option, Question } from '@prisma/client';

export type CreateQuestionResponse = { question: Question; options: Option[] };
