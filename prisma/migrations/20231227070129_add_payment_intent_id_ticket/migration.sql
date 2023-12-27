/*
  Warnings:

  - Added the required column `paymentIntentId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "paymentIntentId" TEXT NOT NULL;
