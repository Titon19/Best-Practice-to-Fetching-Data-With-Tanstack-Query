-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);
