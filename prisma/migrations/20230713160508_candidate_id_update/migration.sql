/*
  Warnings:

  - You are about to alter the column `id` on the `Candidate` table. The data in that column will be cast from `Int` to `String`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_Candidate" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "matric_number" STRING NOT NULL,
    "images" STRING[],
    "fullname" STRING,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);
DROP INDEX "Candidate_matric_number_key";
INSERT INTO "_prisma_new_Candidate" ("createdAt","fullname","id","images","matric_number","updatedAt") SELECT "createdAt","fullname","id","images","matric_number","updatedAt" FROM "Candidate";
DROP TABLE "Candidate" CASCADE;
ALTER TABLE "_prisma_new_Candidate" RENAME TO "Candidate";
CREATE UNIQUE INDEX "Candidate_matric_number_key" ON "Candidate"("matric_number");
