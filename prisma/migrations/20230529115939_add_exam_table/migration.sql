-- CreateTable
CREATE TABLE "Exam" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "examinerId" STRING NOT NULL,
    "courseName" STRING NOT NULL,
    "courseCode" STRING NOT NULL,
    "instructions" STRING NOT NULL,
    "duration" INT4 NOT NULL,
    "quizCode" STRING,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_examinerId_fkey" FOREIGN KEY ("examinerId") REFERENCES "Examiner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
