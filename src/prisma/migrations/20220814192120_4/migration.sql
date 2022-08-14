/*
  Warnings:

  - Added the required column `end` to the `calendar_event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `calendar_event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "calendar_event" ADD COLUMN     "end" TEXT NOT NULL,
ADD COLUMN     "start" TEXT NOT NULL;
