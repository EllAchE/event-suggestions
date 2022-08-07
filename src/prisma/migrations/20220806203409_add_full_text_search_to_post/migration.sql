-- CreateEnum
CREATE TYPE "Source" AS ENUM ('SERPAPI', 'TICKETMASTER', 'MEETUP');

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "field" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "description" TSVECTOR NOT NULL,
    "title" TEXT NOT NULL,
    "source" "Source" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventLocation" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "EventLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLocation" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'US',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lat" DECIMAL(65,30),
    "long" DECIMAL(65,30),
    "zip" INTEGER,
    "state" TEXT,

    CONSTRAINT "UserLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userLocationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- CreateIndex
CREATE INDEX "Event_description_idx" ON "Event"("description");

-- CreateIndex
CREATE UNIQUE INDEX "EventLocation_id_key" ON "EventLocation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserLocation_id_key" ON "UserLocation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "EventLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userLocationId_fkey" FOREIGN KEY ("userLocationId") REFERENCES "UserLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
