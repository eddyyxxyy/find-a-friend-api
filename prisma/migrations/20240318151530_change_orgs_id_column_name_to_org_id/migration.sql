/*
  Warnings:

  - You are about to drop the column `orgs_id` on the `pets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_orgs_id_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "orgs_id",
ADD COLUMN     "org_id" TEXT;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
