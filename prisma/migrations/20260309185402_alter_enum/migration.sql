/*
  Warnings:

  - The values [SMALL,MEDIUM,LARGE] on the enum `Size` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Size_new" AS ENUM ('small', 'medium', 'large');
ALTER TABLE "Pet" ALTER COLUMN "size" TYPE "Size_new" USING ("size"::text::"Size_new");
ALTER TYPE "Size" RENAME TO "Size_old";
ALTER TYPE "Size_new" RENAME TO "Size";
DROP TYPE "Size_old";
COMMIT;
