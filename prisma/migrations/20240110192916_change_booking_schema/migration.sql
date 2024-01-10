/*
  Warnings:

  - You are about to drop the column `paymentIntentId` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "paymentIntentId",
ADD COLUMN     "sessionId" TEXT;
