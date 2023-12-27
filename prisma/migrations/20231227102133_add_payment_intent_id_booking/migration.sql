/*
  Warnings:

  - Added the required column `paymentIntentId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "paymentIntentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Bundle" ALTER COLUMN "remainingAmount" DROP NOT NULL;
