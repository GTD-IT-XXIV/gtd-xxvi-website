/*
  Warnings:

  - The primary key for the `Ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `close` to the `Bundle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxPurchases` to the `Bundle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `open` to the `Bundle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bundle" ADD COLUMN     "close" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "maxPurchases" INTEGER NOT NULL,
ADD COLUMN     "open" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Ticket_id_seq";
