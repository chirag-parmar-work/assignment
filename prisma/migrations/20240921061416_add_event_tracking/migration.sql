/*
  Warnings:

  - You are about to drop the column `startDate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `visitorId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `companySize` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Visitor` table. All the data in the column will be lost.
  - Added the required column `start_date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_size` to the `Visitor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_visitorId_fkey";

-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_userId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "startDate",
DROP COLUMN "userId",
DROP COLUMN "visitorId",
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "visitor_id" TEXT;

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "companySize",
DROP COLUMN "userId",
ADD COLUMN     "company_size" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_visitor_id_fkey" FOREIGN KEY ("visitor_id") REFERENCES "Visitor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
