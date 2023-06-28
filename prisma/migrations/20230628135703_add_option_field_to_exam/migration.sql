/*
  Warnings:

  - Added the required column `examId` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "examId" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
