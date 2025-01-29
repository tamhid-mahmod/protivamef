/*
  Warnings:

  - A unique constraint covering the columns `[studentAId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Result_studentAId_key" ON "Result"("studentAId");
