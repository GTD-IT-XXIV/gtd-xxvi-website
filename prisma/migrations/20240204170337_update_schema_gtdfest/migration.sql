/*
  Warnings:

  - You are about to drop the column `bundleId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `timeslotId` on the `Booking` table. All the data in the column will be lost.
  - The primary key for the `Bundle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `eventId` on the `Bundle` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Bundle` table. All the data in the column will be lost.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Event` table. All the data in the column will be lost.
  - The primary key for the `Ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bundleId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `paymentIntentId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `telegramHandle` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `timeslotId` on the `Ticket` table. All the data in the column will be lost.
  - The `id` column on the `Ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Timeslot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `eventId` on the `Timeslot` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Timeslot` table. All the data in the column will be lost.
  - Added the required column `bundleName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventName` to the `Bundle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bundleName` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventName` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventName` to the `Timeslot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_bundleId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_timeslotId_fkey";

-- DropForeignKey
ALTER TABLE "Bundle" DROP CONSTRAINT "Bundle_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_bundleId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_timeslotId_fkey";

-- DropForeignKey
ALTER TABLE "Timeslot" DROP CONSTRAINT "Timeslot_eventId_fkey";

-- DropIndex
DROP INDEX "Bundle_name_eventId_key";

-- DropIndex
DROP INDEX "Event_name_key";

-- DropIndex
DROP INDEX "Timeslot_startTime_endTime_eventId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "bundleId",
DROP COLUMN "eventId",
DROP COLUMN "quantity",
DROP COLUMN "timeslotId",
ADD COLUMN     "bundleName" TEXT NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventName" TEXT NOT NULL,
ADD COLUMN     "names" TEXT[],
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Bundle" DROP CONSTRAINT "Bundle_pkey",
DROP COLUMN "eventId",
DROP COLUMN "id",
ADD COLUMN     "eventName" TEXT NOT NULL,
ADD CONSTRAINT "Bundle_pkey" PRIMARY KEY ("name", "eventName");

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_pkey",
DROP COLUMN "bundleId",
DROP COLUMN "created",
DROP COLUMN "email",
DROP COLUMN "paymentIntentId",
DROP COLUMN "phoneNumber",
DROP COLUMN "telegramHandle",
DROP COLUMN "timeslotId",
ADD COLUMN     "bundleName" TEXT NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventName" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Timeslot" DROP CONSTRAINT "Timeslot_pkey",
DROP COLUMN "eventId",
DROP COLUMN "id",
ADD COLUMN     "eventName" TEXT NOT NULL,
ADD CONSTRAINT "Timeslot_pkey" PRIMARY KEY ("startTime", "endTime", "eventName");

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telegramHandle" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentIntentId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bundle" ADD CONSTRAINT "Bundle_eventName_fkey" FOREIGN KEY ("eventName") REFERENCES "Event"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timeslot" ADD CONSTRAINT "Timeslot_eventName_fkey" FOREIGN KEY ("eventName") REFERENCES "Event"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_eventName_fkey" FOREIGN KEY ("eventName") REFERENCES "Event"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_eventName_bundleName_fkey" FOREIGN KEY ("eventName", "bundleName") REFERENCES "Bundle"("eventName", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_startTime_endTime_eventName_fkey" FOREIGN KEY ("startTime", "endTime", "eventName") REFERENCES "Timeslot"("startTime", "endTime", "eventName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventName_fkey" FOREIGN KEY ("eventName") REFERENCES "Event"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventName_bundleName_fkey" FOREIGN KEY ("eventName", "bundleName") REFERENCES "Bundle"("eventName", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_startTime_endTime_eventName_fkey" FOREIGN KEY ("startTime", "endTime", "eventName") REFERENCES "Timeslot"("startTime", "endTime", "eventName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
