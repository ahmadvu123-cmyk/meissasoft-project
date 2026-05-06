-- CreateTable
CREATE TABLE "PayrollEmbedding" (
    "id" SERIAL NOT NULL,
    "summary" TEXT NOT NULL,
    "embedding" vector(3072) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PayrollEmbedding_pkey" PRIMARY KEY ("id")
);
