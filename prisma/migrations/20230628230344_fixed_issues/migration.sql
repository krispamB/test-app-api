-- CreateTable
CREATE TABLE "Examiner" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "name" STRING NOT NULL,
    "surname" STRING NOT NULL,
    "faculty" STRING NOT NULL,
    "department" STRING NOT NULL,

    CONSTRAINT "Examiner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "matric_number" STRING NOT NULL,
    "images" STRING[],
    "fullname" STRING,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Question" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "examId" STRING NOT NULL,
    "question" STRING NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "examId" STRING NOT NULL,
    "questionId" STRING NOT NULL,
    "option" STRING NOT NULL,
    "isCorrect" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Examiner_email_key" ON "Examiner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_matric_number_key" ON "Candidate"("matric_number");

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_examinerId_fkey" FOREIGN KEY ("examinerId") REFERENCES "Examiner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
