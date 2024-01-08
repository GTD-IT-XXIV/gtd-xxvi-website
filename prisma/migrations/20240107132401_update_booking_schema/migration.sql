/*
  Warnings:

  - A unique constraint covering the columns `[email,eventId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bundleId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeslotId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telegramHandle` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Booking_email_key";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "bundleId" INTEGER NOT NULL,
ADD COLUMN     "eventId" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "timeslotId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "telegramHandle" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_email_eventId_key" ON "Booking"("email", "eventId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bundleId_fkey" FOREIGN KEY ("bundleId") REFERENCES "Bundle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_timeslotId_fkey" FOREIGN KEY ("timeslotId") REFERENCES "Timeslot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
