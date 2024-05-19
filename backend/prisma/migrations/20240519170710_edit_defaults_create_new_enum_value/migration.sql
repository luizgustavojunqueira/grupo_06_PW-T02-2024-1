-- AlterEnum
ALTER TYPE "Recurrence" ADD VALUE 'NONE';

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "local" SET DEFAULT '';
