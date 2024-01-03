/*
  Warnings:

  - Added the required column `remainingAmount` to the `Bundle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bundle" ADD COLUMN     "remainingAmount" INTEGER NOT NULL;
