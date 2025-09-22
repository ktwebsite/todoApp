import EditPostForm from "@/components/edit/EditPostForm";
import { prisma } from "@/lib/prisma";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  // Prismaで直接DBから取得
  const {id} = await params
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post) {
    throw new Error("指定された投稿が存在しません");
  }
  

  return <EditPostForm defaultValues={post} />;
}


