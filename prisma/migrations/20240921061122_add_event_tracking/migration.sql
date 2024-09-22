/*
  Warnings:

  - You are about to drop the `_EventVisitors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserEvents` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EventVisitors" DROP CONSTRAINT "_EventVisitors_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventVisitors" DROP CONSTRAINT "_EventVisitors_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserEvents" DROP CONSTRAINT "_UserEvents_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserEvents" DROP CONSTRAINT "_UserEvents_B_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "visitorId" TEXT;

-- DropTable
DROP TABLE "_EventVisitors";

-- DropTable
DROP TABLE "_UserEvents";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
