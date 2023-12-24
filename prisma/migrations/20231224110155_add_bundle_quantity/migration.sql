/*
  Warnings:

  - The primary key for the `Ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `quantity` to the `Bundle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'RECEIVED');

-- AlterTable
ALTER TABLE "Bundle" ADD COLUMN "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL,
ADD COLUMN     "transactionId" INTEGER NOT NULL,
ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
