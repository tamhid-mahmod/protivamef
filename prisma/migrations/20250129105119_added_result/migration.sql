/*
  Warnings:

  - A unique constraint covering the columns `[resultId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_studentAppliedForId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_studentEducationBackgroundId_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "resultId" TEXT;

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "studentAId" TEXT NOT NULL,
    "mark" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_resultId_key" ON "Student"("resultId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_studentEducationBackgroundId_fkey" FOREIGN KEY ("studentEducationBackgroundId") REFERENCES "StudentEducationBackground"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_studentAppliedForId_fkey" FOREIGN KEY ("studentAppliedForId") REFERENCES "StudentAppliedFor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE SET NULL ON UPDATE CASCADE;
