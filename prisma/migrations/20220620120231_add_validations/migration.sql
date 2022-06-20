-- CreateTable
CREATE TABLE "Validation" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "expired" BOOLEAN NOT NULL DEFAULT false,
    "expiredIn" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '1 day',
    "userId" INTEGER,

    CONSTRAINT "Validation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Validation_id_key" ON "Validation"("id");

-- AddForeignKey
ALTER TABLE "Validation" ADD CONSTRAINT "Validation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
