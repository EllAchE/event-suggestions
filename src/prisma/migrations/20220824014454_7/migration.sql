-- AlterTable
ALTER TABLE "calendar_event" ADD COLUMN     "categories" TEXT[];

-- AlterTable
ALTER TABLE "query" ADD COLUMN     "include_comedy" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "include_family" BOOLEAN NOT NULL DEFAULT true;
