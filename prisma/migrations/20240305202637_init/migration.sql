-- CreateEnum
CREATE TYPE "pets_sizes" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'HUGE');

-- CreateEnum
CREATE TYPE "pets_energy_levels" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "pets_independence_levels" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "pets_environment_minimum_sizes" AS ENUM ('SMALL', 'MEDIUM', 'WIDE', 'XWIDE');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owners_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "whatsapp_number" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "size" "pets_sizes" NOT NULL,
    "energy_level" "pets_energy_levels" NOT NULL,
    "independence_level" "pets_independence_levels" NOT NULL,
    "environment_minimum_size" "pets_environment_minimum_sizes" NOT NULL,
    "orgs_id" TEXT,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_orgs_id_fkey" FOREIGN KEY ("orgs_id") REFERENCES "orgs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
