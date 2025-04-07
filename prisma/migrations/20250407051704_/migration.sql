-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_belongsToId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
