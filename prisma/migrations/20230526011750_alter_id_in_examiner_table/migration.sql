/*
  Warnings:

  - You are about to alter the column `id` on the `Examiner` table. The data in that column will be cast from `Int` to `String`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_Examiner" (
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
DROP INDEX "Examiner_email_key";
INSERT INTO "_prisma_new_Examiner" ("createdAt","department","email","faculty","id","name","password","surname","updatedAt") SELECT "createdAt","department","email","faculty","id","name","password","surname","updatedAt" FROM "Examiner";
DROP TABLE "Examiner" CASCADE;
ALTER TABLE "_prisma_new_Examiner" RENAME TO "Examiner";
CREATE UNIQUE INDEX "Examiner_email_key" ON "Examiner"("email");
