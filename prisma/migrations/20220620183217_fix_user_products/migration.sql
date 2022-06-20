-- AlterTable
ALTER TABLE "Validation" ALTER COLUMN "expiredIn" SET DEFAULT NOW() + interval '1 day';
