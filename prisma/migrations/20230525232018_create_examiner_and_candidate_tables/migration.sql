-- CreateTable
CREATE TABLE "Examiner" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
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

-- CreateIndex
CREATE UNIQUE INDEX "Examiner_email_key" ON "Examiner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_matric_number_key" ON "Candidate"("matric_number");
