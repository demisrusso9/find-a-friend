/*
  Warnings:

  - Added the required column `breed` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "breed" TEXT NOT NULL;
