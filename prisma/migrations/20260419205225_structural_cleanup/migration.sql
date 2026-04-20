/*
  Warnings:

  - You are about to drop the column `isRemote` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `salaryMax` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `salaryMin` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Job` table. All the data in the column will be lost.
  - Added the required column `jobStatus` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "isRemote",
DROP COLUMN "salaryMax",
DROP COLUMN "salaryMin",
DROP COLUMN "skills",
DROP COLUMN "status",
ADD COLUMN     "jobStatus" "JobStatus" NOT NULL,
ADD COLUMN     "salary" TEXT,
ALTER COLUMN "location" DROP NOT NULL;
