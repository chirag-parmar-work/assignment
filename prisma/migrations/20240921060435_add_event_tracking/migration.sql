/*
  Warnings:

  - You are about to drop the column `endDate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `visits` on the `Visitor` table. All the data in the column will be lost.
  - Added the required column `company_size` to the `Visitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "endDate";

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "visits",
ADD COLUMN     "company_size" TEXT NOT NULL;
