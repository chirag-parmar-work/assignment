/*
  Warnings:

  - You are about to drop the column `company_size` on the `Visitor` table. All the data in the column will be lost.
  - Added the required column `companySize` to the `Visitor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "company_size",
ADD COLUMN     "companySize" TEXT NOT NULL;
