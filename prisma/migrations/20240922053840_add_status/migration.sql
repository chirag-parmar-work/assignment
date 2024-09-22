/*
  Warnings:

  - A unique constraint covering the columns `[surface_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_surface_id_key" ON "User"("surface_id");
