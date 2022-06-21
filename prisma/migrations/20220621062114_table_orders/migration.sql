-- CreateEnum
CREATE TYPE "FormPayment" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'PIX');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "inOrder" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "orderId" INTEGER;

-- AlterTable
ALTER TABLE "Validation" ALTER COLUMN "expiredIn" SET DEFAULT NOW() + interval '1 day';

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,
    "formPayment" "FormPayment" NOT NULL,
    "addressId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
