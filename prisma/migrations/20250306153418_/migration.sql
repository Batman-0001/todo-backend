/*
  Warnings:

  - A unique constraint covering the columns `[id,belongsToId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Task_id_belongsToId_key" ON "Task"("id", "belongsToId");
