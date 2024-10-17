-- CreateTable
CREATE TABLE "Saftie" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Saftie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Saftie" ADD CONSTRAINT "Saftie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
