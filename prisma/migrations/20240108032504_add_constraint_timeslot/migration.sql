/*
  Warnings:

  - A unique constraint covering the columns `[startTime,endTime,eventId]` on the table `Timeslot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Timeslot_startTime_endTime_eventId_key" ON "Timeslot"("startTime", "endTime", "eventId");
