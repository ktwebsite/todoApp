// app/api/posts/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();

  try {
    const updated = await prisma.post.update({
      where: { id: Number(params.id) }, // ← IDを数値に変換しているか要確認
      data: {
        title: body.title,
        details: body.details,
        deadline: new Date(body.deadline), // ← deadlineをDate型に変換しているか？
        status: body.status,
        completed_at: body.status === "完了" ? new Date() : null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("更新エラー:", error);
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.post.delete({
      where: { id: Number(params.id) }, // ← ここで削除
    });

    return NextResponse.json({ message: "削除しました" });
  } catch (error) {
    console.error("削除エラー:", error);
    return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get("status") // all | completed | incomplete

  let where = {}
  if (status === "completed") {
    where = { status: "完了" }
  } else if (status === "incomplete") {
    where = { status: "未完了" }
  }

  const posts = await prisma.post.findMany({
    where,
    orderBy: { deadline: "asc" },
  })

  return NextResponse.json(posts)
}