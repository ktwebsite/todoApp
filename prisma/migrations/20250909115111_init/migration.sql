-- CreateTable
CREATE TABLE "public"."Post" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "details" TEXT,
    "deadline" TIMESTAMP(3),
    "status" VARCHAR(20) NOT NULL DEFAULT '未完了',
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
