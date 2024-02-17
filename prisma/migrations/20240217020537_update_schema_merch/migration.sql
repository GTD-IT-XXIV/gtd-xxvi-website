-- CreateTable
CREATE TABLE "Merch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "variations" TEXT[],
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Merch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchBundle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "images" TEXT[],
    "stock" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "MerchBundle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BundleItem" (
    "merchId" INTEGER NOT NULL,
    "merchBundleId" INTEGER NOT NULL,

    CONSTRAINT "BundleItem_pkey" PRIMARY KEY ("merchId","merchBundleId")
);

-- CreateTable
CREATE TABLE "MerchBooking" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telegramHandle" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "merchBundleId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "sessionId" TEXT,

    CONSTRAINT "MerchBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchBookingItem" (
    "id" SERIAL NOT NULL,
    "merchBookingId" INTEGER NOT NULL,
    "merchId" INTEGER NOT NULL,
    "variation" TEXT NOT NULL,

    CONSTRAINT "MerchBookingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchOrder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telegramHandle" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentIntentId" TEXT NOT NULL,

    CONSTRAINT "MerchOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchOrderBundle" (
    "id" SERIAL NOT NULL,
    "merchBundleId" INTEGER NOT NULL,
    "merchOrderId" TEXT NOT NULL,

    CONSTRAINT "MerchOrderBundle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchOrderBundleItem" (
    "id" SERIAL NOT NULL,
    "merchOrderBundleId" INTEGER NOT NULL,
    "merchId" INTEGER NOT NULL,
    "variation" TEXT NOT NULL,

    CONSTRAINT "MerchOrderBundleItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BundleItem" ADD CONSTRAINT "BundleItem_merchId_fkey" FOREIGN KEY ("merchId") REFERENCES "Merch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BundleItem" ADD CONSTRAINT "BundleItem_merchBundleId_fkey" FOREIGN KEY ("merchBundleId") REFERENCES "MerchBundle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchBooking" ADD CONSTRAINT "MerchBooking_merchBundleId_fkey" FOREIGN KEY ("merchBundleId") REFERENCES "MerchBundle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchBookingItem" ADD CONSTRAINT "MerchBookingItem_merchBookingId_fkey" FOREIGN KEY ("merchBookingId") REFERENCES "MerchBooking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchBookingItem" ADD CONSTRAINT "MerchBookingItem_merchId_fkey" FOREIGN KEY ("merchId") REFERENCES "Merch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchOrderBundle" ADD CONSTRAINT "MerchOrderBundle_merchBundleId_fkey" FOREIGN KEY ("merchBundleId") REFERENCES "MerchBundle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchOrderBundle" ADD CONSTRAINT "MerchOrderBundle_merchOrderId_fkey" FOREIGN KEY ("merchOrderId") REFERENCES "MerchOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchOrderBundleItem" ADD CONSTRAINT "MerchOrderBundleItem_merchOrderBundleId_fkey" FOREIGN KEY ("merchOrderBundleId") REFERENCES "MerchOrderBundle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchOrderBundleItem" ADD CONSTRAINT "MerchOrderBundleItem_merchId_fkey" FOREIGN KEY ("merchId") REFERENCES "Merch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
