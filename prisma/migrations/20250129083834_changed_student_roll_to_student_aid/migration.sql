/*
  Warnings:

  - You are about to drop the column `rollNumber` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentAId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentAId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Student_rollNumber_idx";

-- DropIndex
DROP INDEX "Student_rollNumber_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "rollNumber",
ADD COLUMN     "studentAId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentAId_key" ON "Student"("studentAId");

-- CreateIndex
CREATE INDEX "Student_studentAId_idx" ON "Student"("studentAId");
