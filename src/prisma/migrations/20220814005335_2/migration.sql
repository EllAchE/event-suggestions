/*
  Warnings:

  - Added the required column `query_id` to the `calendar_event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "calendar_event" ADD COLUMN     "query_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "location" ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "address_line_1" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL;

-- CreateTable
CREATE TABLE "query" (
    "id" SERIAL NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "include_sports" BOOLEAN NOT NULL DEFAULT true,
    "include_music" BOOLEAN NOT NULL DEFAULT true,
    "location_id" INTEGER,

    CONSTRAINT "query_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "query_id_key" ON "query"("id");

-- AddForeignKey
ALTER TABLE "query" ADD CONSTRAINT "query_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendar_event" ADD CONSTRAINT "calendar_event_query_id_fkey" FOREIGN KEY ("query_id") REFERENCES "query"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
