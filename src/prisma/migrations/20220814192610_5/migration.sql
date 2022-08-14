/*
  Warnings:

  - Made the column `address_line_1` on table `location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `location` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "location" ALTER COLUMN "address_line_1" SET NOT NULL,
ALTER COLUMN "address_line_1" SET DEFAULT '',
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "state" SET DEFAULT '',
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "city" SET DEFAULT '';
