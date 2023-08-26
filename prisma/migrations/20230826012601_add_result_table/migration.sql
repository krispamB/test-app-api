-- CreateTable
CREATE TABLE "Results" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "candidateId" STRING NOT NULL,
    "examId" STRING NOT NULL,
    "matric_number" STRING NOT NULL,
    "score" INT4 NOT NULL,
    "percent" INT4 NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
